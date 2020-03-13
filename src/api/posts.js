const {Router} = require('express');
const bcrypt = require('bcrypt');

const Posts = require('../persistence/posts');
// const Session = require('../persistence/sessions');


const router = new Router();

// router.post('/', async (req, res) => {
//   try {
//     const {email, password} = req.body;
//     const user = await User.find(email);
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(403).json({});
//     }

//     const sessionId = await Session.create(user.id);
//     req.session.id = sessionId;
//     res.status(201).json();
//   } catch (error) {
//     console.error(
//       `POST session ({ email: ${req.body.email} }) >> ${error.stack})`
//     );
//     res.status(500).json();
//   }
// });

router.get('/', async (req, res) => {
	const post = await Posts.find();

	res.render('index', post)
});

router.get('/submit', async (req, res) => {
	items_to_save = {"funding_condition":req.url.split('&')[1].split('=')[1],"disease_condition":req.url.split('&')[0].split('=')[1],"url":decodeURIComponent(req.url.split('&')[2].split('=')[1])}
	saved = await Posts.save(items_to_save)
	if (saved['funding_condition'] != null && saved['disease_condition']!=null){
		res.redirect('/')
	}else{
		res.json(saved)
	}
	
});


module.exports = router;
