import _ from 'lodash';
import axios from './axios';
import { SHORTENER_URL, SHORTENER_KEY } from '../settings/config';

const pattern = /(HTTP:\/\/|HTTPS:\/\/)([a-zA-Z0-9.\/&?_=!*,\(\)+-]+)/ig;

let prevUrls = null;

export default function(text) {
  return replaceLinks(text);
}

function replaceLinks(text) {
  const urls = {};

  String(text).replace(pattern, url => {
    urls[url] = null;
    return url;
  });

  const shouldResolvePrevText = prevUrls != null && isUrlsEqual(prevUrls, urls);
  if (shouldResolvePrevText) return Promise.resolve(formatText(text, prevUrls));

  let promises = _.map(urls, (value, key) => getUrlId(key).then(id => {
    urls[key] = id;
  }));

  return Promise.all(promises)
    .then(() => {
      return formatText(text, urls);
    });
}

function formatText(text, urls) {
  const withChangedLinks = String(text).replace(pattern, url => {
    const id = urls[url];
    return `<a href="${id}">${id}</a>`;
  });

  const withLineBreaks = String(withChangedLinks).replace(/\n/g, '<br />');

  prevUrls = urls;

  return withLineBreaks;
}

function getUrlId(url) {
  return axios.post(SHORTENER_URL,
    {
      longUrl: url
    },
    {
      params: {
        key: SHORTENER_KEY
      }
    }
  ).then((response) => {
    const id = _.get(response, 'data.id');
    return id;
  }).catch(response => {
    return url;
  });
}

function isUrlsEqual(prevUrls, nextUrls) {
  const prevKeys = _.keys(prevUrls);
  const nextKeys = _.keys(nextUrls);

  const isEqual = _.isEqual(prevKeys, nextKeys);

  return isEqual;
}
