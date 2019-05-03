const express = require('express');
const axios = require('axios');
const app = express();

app.set('port', process.env.PORT || 3000);
app.set('env', 'development');
app.set('trust proxy', true);
app.set('strict routing', true);
app.set('case sensitive routing', true);
app.set('x-powered-by', false);

const getUsers = async() => {
	try{
		return await axios.get('https://randomuser.me/api/?results=10')
	} catch(err){
		console.error(err);
	}
}

const htmlFormat = (data, p) => {
	let items = `<h2>Page ${p || 1}</h2>`;
	data.forEach(user => items += 
		`<p>${user.name.title} ${user.name.first} ${user.name.last}</p>`
	);
	return items;
}

app.get('*', async function(req, res){
	try{
		const page = parseInt(req.url.replace('/', ''));
		const {data} = await getUsers();
		res.set({
			'Content-Type': 'text/html',
			'Cache-control': 'private, max-age=86400',
			'Last-Modified': new Date(),
			'Link': '<https://randomuser.me/api/?results=10&page=1>; rel="first",' +
					'<https://randomuser.me/api/?results=10&page=' + (page + 1) + '>; rel="next"'
		});
		
		//Show data as JSON
		//res.json(data);
		
		//Show data as HTML text
		res.end(htmlFormat(data.results, page));
	} catch(err){
		console.log(err);
		res.end('ERROR!');
	}
});

app.listen(app.get('port'), _ => console.log('Started at 127.0.0.1:%s', app.get('port')))

