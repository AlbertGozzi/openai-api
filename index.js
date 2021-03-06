"use strict";

const config = require('./config'),
    axios = require('axios');

class OpenAI {
    constructor(api_key) {
        this._api_key = api_key;
    }

    _safe_cast(number) {
        return number ? Number(number) : null;
    } 

    _send_request(opts) {
        const url = config.completionURL(opts.engine);
        const reqOpts = {
            headers: {
                'Authorization': `Bearer ${this._api_key}`,
                'Content-Type': 'application/json'
            }
        };
        const data = {
            prompt: opts.prompt,
            max_tokens: this._safe_cast(opts.maxTokens),
            temperature: this._safe_cast(opts.temperature),
            top_p: this._safe_cast(opts.topP),
            presence_penalty: this._safe_cast(opts.presencePenalty),
            frequency_penalty: this._safe_cast(opts.frequencyPenalty),
            best_of: this._safe_cast(opts.bestOf),
            n:  this._safe_cast(opts.n),
            stream: opts.stream,
            stop: opts.stop
        };
        return axios.post(url, data, reqOpts);
    }

    complete(opts) {
        return this._send_request(opts);
    }

    search(opts) {
        const url = config.searchURL(opts.engine);
        const reqOpts = {
            headers: {
                'Authorization': `Bearer ${this._api_key}`,
                'Content-Type': 'application/json'
            }
        };
        const data = {
            documents: opts.documents,
            query: opts.query
        };
        return axios.post(url, data, reqOpts);
    }
}

module.exports = OpenAI;
