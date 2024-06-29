const userDB = require("../models/User");
const blog = require("../models/blog");
const fs = require('fs')

const indexPage = (req, res) => {
    res.render('index')
}

const viewPage = async (req, res) => {
    try {

        const data = await blog.find();

        res.render('view', { data });
    } catch (error) {
        console.log(error);
        return false;
    }
}

const addPage = async (req, res) => {
    try {
        res.render('add')
    } catch (error) {
        console.log(error);
        return false
    }
}

const editPage = async (req, res) => {
    try {
        res.render('edit')
    } catch (error) {
        console.log(error);
        return false
    }
}

const insertData = async (req, res) => {

    const { name, genre, desc, date, rating, time, id } = req.body;

    try {
        if (id) {
            if (req.file) {
                let image = req.file.path;
                try {
                    const data = await blog.findById(id);
                    fs.unlinkSync(data.image);
                } catch (err) {
                    console.log(err);
                    return false;
                }
                try {
                    await blog.findByIdAndUpdate(id, { name, genre, desc, date, rating, time, image });
                    return res.redirect('view');
                } catch (err) {
                    console.log(err);
                    return false;
                }
            } else {
                try {
                    const data = await blog.findById(id);
                    let image = data.image;
                    await blog.findByIdAndUpdate(id, { name, genre, desc, date, rating, time, image });
                    return res.redirect('view');
                } catch (err) {
                    console.log(err);
                    return false;
                }
            }
        } else {
            let image = req.file.path;
            try {
                await blog.create({ name, genre, desc, date, rating, time, image });
                return res.redirect('view');
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    } catch (err) {
        console.log(err);
        return false;
    }


}

const editData = async (req, res) => {

    let { id } = req.params;

    try {
        const data = await blog.findById(id);
        console.log(data);
        return res.render('edit', { data });
    } catch (err) {
        console.log(err);
        return false;
    }

}

const deleteData = async (req, res) => {
    let { id } = req.params

    try {
        const data = await blog.findById(id);
        fs.unlinkSync(data.image);
        await blog.findByIdAndDelete(id);
        console.log("Movie Deleted Successfully");
        return res.redirect('/view');
    } catch (err) {
        console.log(err);
        return false;
    }

}

const signup = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    try {
        await userDB.create({ username, email, password, confirmPassword });
        res.redirect('/login');
    } catch (error) {
        console.log(error);
        return false;
    }
};

const signupPage = (req, res) => {
    return res.render('signup');
};

const loginPage = (req, res) => {
    return res.render('login');
};

const logout = async (req, res) => {
    req.logOut((err) => {
        if (err) {
            console.log(err);
        }
    })
    console.log(req.user);
    return res.redirect('/login');
};

const getData = async (req, res) => {
    try {
        let data = await userDB.find({});
        res.send(data);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { indexPage, viewPage, addPage, insertData, editData, deleteData, editPage, signup, signupPage, loginPage, logout, getData }