import { LightningElement, api,track } from 'lwc';

export default class Header extends LightningElement {

    @track _headers = [];
    @api
    get headers() {
        return this._headers;
    }
    set headers(value) {
        this._headers = value;
        this.ensureLastHeaderIsEmpty();
    }

    ensureLastHeaderIsEmpty() {
        if (this._headers.length === 0 || this.isHeaderEmpty(this._headers[this._headers.length - 1])) {
            return;
        }
        this._headers = [...this._headers, { key: '', value: '', checked: true }];
    }

    isHeaderEmpty(header) {
        return !header.key && !header.value;
    }

    isTemplateRow(header) {
        return this.isHeaderEmpty(header) && this._headers.indexOf(header) === this._headers.length - 1;
    }

    /** Event Handlers **/

    disableEvent = (event) => {
        event.stopPropagation();
        event.preventDefault();
    };

    handleChange(event) {
        const value = event.detail.value;
        const row = parseInt(event.target.dataset.index, 10);
        const field = event.target.dataset.field;
        let headerLine = { ...this._headers[row] };
        headerLine[field] = value;

        // Create a new array to trigger reactivity
        const newHeaders = [...this._headers];
        newHeaders[row] = headerLine;
        this._headers = newHeaders;
        this.ensureLastHeaderIsEmpty();
        this.dispatchEvent(new CustomEvent('change', { detail: { value: this._headers } }));
    }

    handleDelete(event) {
        const index = parseInt(event.target.dataset.index, 10);
        this._headers = [...this._headers.filter((_, idx) => idx !== index)];
        this.dispatchEvent(new CustomEvent('change', { detail: { value: this._headers } }));
    }

    handleKeyChange(event) {
        const value = event.detail.value;
        const row = parseInt(event.target.dataset.index, 10);
        let headerLine = { ...this._headers[row] };
        headerLine.key = value;

        // Create a new array to trigger reactivity
        const newHeaders = [...this._headers];
        newHeaders[row] = headerLine;
        this._headers = newHeaders;
        this.dispatchEvent(new CustomEvent('change', { detail: { value: this._headers } }));
    }

    handleKeyInput(event) {
        const value = event.target.value;
        const row = parseInt(event.target.dataset.index, 10);
        let headerLine = { ...this._headers[row] };
        headerLine.key = value;

        // Filter suggestions based on input
        headerLine.filteredSuggestions = this.headerKeyOptions.filter(option =>
            option.label.toLowerCase().includes(value.toLowerCase())
        );
        headerLine.showSuggestions = headerLine.filteredSuggestions.length > 0;

        // Create a new array to trigger reactivity
        const newHeaders = [...this._headers];
        newHeaders[row] = headerLine;
        this._headers = newHeaders;
        this.dispatchEvent(new CustomEvent('change', { detail: { value: this._headers } }));
    }

    handleSuggestionClick(event) {
        const value = event.target.dataset.value;
        const row = parseInt(event.target.dataset.index, 10);
        let headerLine = { ...this._headers[row] };
        headerLine.key = value;
        headerLine.showSuggestions = false;

        // Create a new array to trigger reactivity
        const newHeaders = [...this._headers];
        newHeaders[row] = headerLine;
        this._headers = newHeaders;
        this.dispatchEvent(new CustomEvent('change', { detail: { value: this._headers } }));
    }

    /** Getters **/

    get computedHeaders() {
        return this.headers.map((header, idx) => {
            return {
                ...header,
                index: idx,
                isDeleteEnabled: !this.isTemplateRow(header)
            };
        });
    }

    get headerKeyOptions() {
        return [
            { label: 'Accept', value: 'Accept' },
            { label: 'Accept-Encoding', value: 'Accept-Encoding' },
            { label: 'Accept-Language', value: 'Accept-Language' },
            { label: 'Access-Control-Allow-Headers', value: 'Access-Control-Allow-Headers' },
            { label: 'Access-Control-Allow-Methods', value: 'Access-Control-Allow-Methods' },
            { label: 'Access-Control-Allow-Origin', value: 'Access-Control-Allow-Origin' },
            { label: 'Access-Control-Expose-Headers', value: 'Access-Control-Expose-Headers' },
            { label: 'Authorization', value: 'Authorization' },
            { label: 'Cache-Control', value: 'Cache-Control' },
            { label: 'Connection', value: 'Connection' },
            { label: 'Content-Encoding', value: 'Content-Encoding' },
            { label: 'Content-Length', value: 'Content-Length' },
            { label: 'Content-Type', value: 'Content-Type' },
            { label: 'Cookie', value: 'Cookie' },
            { label: 'Date', value: 'Date' },
            { label: 'Expect', value: 'Expect' },
            { label: 'Forwarded', value: 'Forwarded' },
            { label: 'From', value: 'From' },
            { label: 'Host', value: 'Host' },
            { label: 'If-Match', value: 'If-Match' },
            { label: 'If-Modified-Since', value: 'If-Modified-Since' },
            { label: 'If-None-Match', value: 'If-None-Match' },
            { label: 'If-Range', value: 'If-Range' },
            { label: 'If-Unmodified-Since', value: 'If-Unmodified-Since' },
            { label: 'Max-Forwards', value: 'Max-Forwards' },
            { label: 'Origin-Trial', value: 'Origin-Trial' },
            { label: 'Pragma', value: 'Pragma' },
            { label: 'Proxy-Authorization', value: 'Proxy-Authorization' },
            { label: 'Range', value: 'Range' },
            { label: 'Referer', value: 'Referer' },
            { label: 'Referrer-Policy', value: 'Referrer-Policy' },
            { label: 'Sforce-Auto-Assign', value: 'Sforce-Auto-Assign' },
            { label: 'Sforce-Call-Options', value: 'Sforce-Call-Options' },
            { label: 'Sforce-Duplicate-Rule-Header', value: 'Sforce-Duplicate-Rule-Header' },
            { label: 'Sforce-Limit-Info', value: 'Sforce-Limit-Info' },
            { label: 'Sforce-Query-Options', value: 'Sforce-Query-Options' },
            { label: 'Sforce-Search-Options', value: 'Sforce-Search-Options' },
            { label: 'Sforce-Session-Id', value: 'Sforce-Session-Id' },
            { label: 'Sforce-Trigger-Disable', value: 'Sforce-Trigger-Disable' },
            { label: 'Sforce-Trigger-Enable', value: 'Sforce-Trigger-Enable' },
            { label: 'Sforce-Trigger-Old', value: 'Sforce-Trigger-Old' },
            { label: 'Sforce-Trigger-Size', value: 'Sforce-Trigger-Size' },
            { label: 'Sforce-Trigger-User', value: 'Sforce-Trigger-User' },
            { label: 'Strict-Transport-Security', value: 'Strict-Transport-Security' },
            { label: 'TE', value: 'TE' },
            { label: 'Transfer-Encoding', value: 'Transfer-Encoding' },
            { label: 'Upgrade', value: 'Upgrade' },
            { label: 'User-Agent', value: 'User-Agent' },
            { label: 'Vary', value: 'Vary' },
            { label: 'Via', value: 'Via' },
            { label: 'Warning', value: 'Warning' },
            { label: 'X-Content-Type-Options', value: 'X-Content-Type-Options' },
            { label: 'X-Powered-By', value: 'X-Powered-By' },
            { label: 'X-Request-Id', value: 'X-Request-Id' },
            { label: 'X-Robots-Tag', value: 'X-Robots-Tag' },
            { label: 'X-Sfdc-Edge-Cache', value: 'X-Sfdc-Edge-Cache' },
            { label: 'X-Sfdc-Request-Id', value: 'X-Sfdc-Request-Id' }
        ];
    }

}