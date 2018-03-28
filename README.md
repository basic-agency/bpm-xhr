# XHR

## Usage

```javascript
// POST
new XHR('json')
	.post(url, new FormData(form))
	.then(xhr => {
		console.log(xhr.response);
	})
	.catch((status) => {
		console.warn(src, status);
	});

// GET
new XHR('json')
	.get(url)
	.then(xhr => {
		console.log(xhr.response);
	})
	.catch((status) => {
		console.warn(src, status);
	});

// load image as blob
new XHR('blob')
	.onProgress((e) => {
		console.log(e.loaded / e.total);
	})
	.get(src)
	.then(xhr => {
		const img = document.createElement('img');
		img.onload = () => {
			console.log(img);
			window.URL.revokeObjectURL(img.src);
		};
		img.src = window.URL.createObjectURL(xhr.response);
	});
```
