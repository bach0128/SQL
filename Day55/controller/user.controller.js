const user = require("../models/index");
const { string } = require("yup");
const { User } = user;
const bcrypt = require("bcrypt");
const saltRounds = 12;
module.exports = {
  index: async (req, res) => {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "password", "status"],
      //     where: {
      //       id: 2,
      //     },
      order: [["id", "desc"]],
    });
    res.json(users);
  },
  add: async (req, res) => {
    res.render("users/add", { req });
  },
  handleAdd: async (req, res) => {
    // const body = await req.validate(req.body, {
    //   name: string().required("Tên bắt buộc phải nhâp"),
    //   email: string()
    //     .required("Email bắt buộc phải nhập")
    //     .email("Email không đúng định dạng")
    //     .test("check-email", "Email đã được sử dụng", async (value) => {
    //       const result = await userModel.checkEmail(value);
    //       return !result.length;
    //     }),
    //   status: string().test(
    //     "check-status",
    //     "Trang thai khong hop le",
    //     (value) => {
    //       value = +value;
    //       if (!isNaN(value) && (value === 0 || value === 1)) {
    //         return true;
    //       } else {
    //         return false;
    //       }
    //     }
    //   ),
    // });
    const body = await req.body;
    const password = body.password;
    let encryptedPassword = "";
    if (body) {
      await bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          User.create({
            name: body.name,
            email: body.email,
            password: hash,
            status: body.status === 1 ? true : false,
          });
        });
      });

      return res.redirect("/users");
    }
    return res.redirect("/users/add");
  },

  login: (req, res) => {
    res.render("users/login", { req });
  },
  handleLogin: async (req, res) => {
    const body = await req.body;
    const userEmail = body.email;
    //... fetch user from a db etc.
    const checkUser = await User.findOne({
      attributes: ["name", "email", "password"],
      where: {
        email: userEmail,
      },
    });
    if (checkUser) {
      bcrypt.compare(body.password, checkUser.password, function (err, result) {
        if (err) {
          console.log("err", err);
          // req.flash("err", "Có lỗi xảy ra");
          res.redirect("/users/login");
        } else {
          if (result) {
            // req.flash("success", "Đăng nhập thành công");
            res.redirect("/");
          }
        }
      });
    } else {
      res.redirect("/users/login");
    }

    if (!body) {
      return res.redirect("/users/login");
    }
  },
};
