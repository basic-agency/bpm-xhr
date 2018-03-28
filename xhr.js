export default class XHR {

	constructor(type) {
		this.xhr = new XMLHttpRequest();

		this.type = type;

		this.url = '';

		this.postData = {};

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
			this.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			this.xhr.timeout = this.timeout;
			this.xhr.send(data);
		});
	}

}
