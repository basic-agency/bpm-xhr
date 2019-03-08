export default class XHR {

	constructor(type) {
		this.xhr = new XMLHttpRequest();

		this.type = type;
		this.url = '';
		this.data = null;

		this.header = {};
		this.onprogress = false;
		this.timeout = 30000;
	}
	
	setHeader(property, value) {
		this.header[property] = value;
		return this; // allow chaining
	}

	onProgress(fn) {
		this.onprogress = fn;
		return this; // allow chaining
	}

	setTimeout(i) {
		this.timeout = i;
		return this; // allow chaining
	}

	setType() {
		try {
			this.xhr.responseType = this.type;
		} catch (e) {
			// console.warn(e);
		}
	}

	onreadystatechange(resolve, reject) {
		this.xhr.onreadystatechange = () => {
			if (this.xhr.readyState === 4) {
				this.xhr.status === 200 ? resolve(this.xhr) : reject(this.xhr);
			}
		};
	}
	
	request(method) {
		return new Promise((resolve, reject) => {
			if (this.onprogress) this.xhr.onprogress = this.onprogress;
			this.setType();
			this.onreadystatechange(resolve, reject);
			this.xhr.open(method, this.url, true);
			for (const h in this.header) this.xhr.setRequestHeader(h, this.header[h]);
			this.xhr.timeout = this.timeout;
			this.xhr.send(this.data);
		});
	}

	get(url) {
		this.url = url;
		return this.request('GET');
	}

	post(url, data) {
		this.url = url;
		this.data = data;
		return this.request('POST');
	}

	put(url, data) {
		this.url = url;
		this.data = data;
		return this.request('PUT');
	}

	delete(url, data) {
		this.url = url;
		this.data = data;
		return this.request('DELETE');
	}
	
	abort() {
		this.xhr.abort();
	}

}
