import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// declare const Pusher: any;
import Pusher from 'pusher-js';
const PUSHER_API_KEY = 'd19b81325d03c2630f93';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  channelName:"location";
  channel:any;
  pusher:any;
  constructor(public http: HttpClient) {
  var pusher = new Pusher(PUSHER_API_KEY, {
  cluster: 'ap2',
  encrypted: true,
  disableStats: true,
  forceTLS: false,
  });
  this.channel = pusher.subscribe('location');
  }

listen(event, callback) {
  var pusher = new Pusher(PUSHER_API_KEY, {
    cluster: 'ap2',
    encrypted: true,
    disableStats: true,
    forceTLS: false,
    });
    this.channel = pusher.subscribe(this.channelName);
    //console.log('subscribed to channel', this.channel);
    this.channel.bind(event, (res) => {
      //console.log('pusher event', res);
      callback(res);
    });
    this.channel.bind('pusher:subscription_error', function(err) {
      //console.log('pusher error', err);
    });
  }
}
