export default class XHR {

	constructor(type) {
		this.xhr = new XMLHttpRequest();

		this.type = type;

		this.url = '';

		this.postData = {};
		
		this.header = {};

		this.onprogress = false;

		this.timeout = 30000;
	}

	onProgress(fn) {
		this.onprogress = fn;
		return this; // allow chaining
	}

	setTimeout(i) {
		this.timeout = i;
		return this; // allow chaining
	}
	
	setHeader(property, value) {
		this.header[property] = value;
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
			// this.setType(); // IE
			if (this.xhr.readyState === 4) this.xhr.status === 200 ? resolve(this.xhr) : reject(this.xhr);
		};
	}

	get(url) {
		this.url = url;
		if (this.onprogress) this.xhr.onprogress = this.onprogress;
		return new Promise((resolve, reject) => {
			this.setType();
			this.onreadystatechange(resolve, reject);
			this.xhr.open('GET', url, true);
			for (const h in this.header) this.xhr.setRequestHeader(h, this.header[h]);
			this.xhr.timeout = this.timeout;
			this.xhr.send();
		});
	}

	post(url, data) {
		this.url = url;
		this.postData = data;
		if (this.onprogress) this.xhr.onprogress = this.onprogress;
		return new Promise((resolve, reject) => {
			this.setType();
			this.onreadystatechange(resolve, reject);
			this.xhr.open('POST', url, true);
			for (const h in this.header) this.xhr.setRequestHeader(h, this.header[h]);
			this.xhr.timeout = this.timeout;
			this.xhr.send(data);
		});
	}
	
	abort() {
		this.xhr.abort();
	}

}
