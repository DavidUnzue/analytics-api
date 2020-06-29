import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { PageView } from './schemas/page-view.schema';
import { PageView, PageViewModel } from './interfaces/page-view.interface';
const geoip = require('geoip-lite');
const parser = require('ua-parser-js');

@Injectable()
export class PageViewsService {
  constructor(
    @InjectModel('PageView') private pageViewModel: Model<PageViewModel>,
  ) {}

  async findAll(): Promise<PageView[]> {
    return await this.pageViewModel.find();
  }

  async findByFilter(query: any): Promise<PageView[]> {
    // TODO: query params should be sanitized before sending to DB
    let { where = '{}', projection = '{}' } = query;

    // 'where' query params as filter, e.g.: where={"pageId": "page1"}
    try {
      where = JSON.parse(where);
    } catch (e) {
      console.log(e);
      where = {};
    }

    // 'projection' params to return only specific fields, e.g.: projection={"pageId": 1}
    try {
      projection = JSON.parse(projection);
      projection = Object.keys(projection)
        .map(key => {
          if (projection[key]) {
            return key;
          }
        })
        .join(' ');
    } catch (e) {
      console.log(e);
      projection = {};
    }

    return await this.pageViewModel.find(where, projection);
  }

  async getRate(query: any): Promise<any> {
    // TODO: query params should be sanitized before sending to DB
    let { where = '{}' } = query;

    // 'where' query params as filter, e.g.: where={"pageId": "page1"}
    try {
      where = JSON.parse(where);
    } catch (e) {
      console.log(e);
      where = {};
    }

    const timeRangeViews = await this.pageViewModel.find(where, 'userId');
    const returningUsers = new Set();
    const allUsers = new Set();
    // returning users appear more than one time in the selected list of page views
    timeRangeViews.forEach(view => {
      const { userId } = view;
      if (allUsers.has(userId)) {
        returningUsers.add(userId);
      } else {
        allUsers.add(userId);
      }
    });
    // return rate of returning vs all users
    return {
      rate: (returningUsers.size / allUsers.size) * 100,
    };
  }

  async create(
    pageView: PageView,
    reqIp: string,
    userAgent: string,
  ): Promise<PageView> {
    // add computed properties if missing
    const geo = geoip.lookup(reqIp) || {};
    const ua = parser(userAgent);
    const fullPageView = Object.assign(
      {
        country: geo.country || 'Germany',
        browserName: (ua.browser || {}).name || userAgent,
        userId: geoip.pretty(reqIp),
      },
      pageView,
    );

    const newPageView = new this.pageViewModel(fullPageView);
    return await newPageView.save();
  }

  async delete(id: string): Promise<PageView> {
    return await this.pageViewModel.findByIdAndRemove(id);
  }
}
