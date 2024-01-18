const user = require("../models/index");
const { string } = require("yup");
const { User } = user;
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const saltRounds = 12;
module.exports = {
  index: async (req, res, next) => {
    let filters = {};
    let users;

    const { status, keyword } = req.query;
    if (status === "active" || status === "inactive") {
      filters.status = status === "active";
    }
    if (keyword) {
      filters = {
        [Op.or]: {
          name: {
            [Op.iLike]: `%${keyword}%`,
          },
          email: {
            [Op.iLike]: `%${keyword}%`,
          },
        },
      };
    }
    try {
      users = await User.findAll({
        attributes: ["id", "name", "email", "password", "status"],
        order: [["id", "desc"]],
        where: filters,
      });
    } catch (e) {
      return next(e);
    }
    res.render("users/index", { users });
  },
  add: async (req, res) => {
    res.render("users/add", { req });
  },
  handleAdd: async (req, res) => {
    const body = await req.validate(req.body, {
      name: string().required("Tên bắt buộc phải nhâp"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng")
        .test("check-email", "Email đã được sử dụng", async () => {
          const result = await User.findOne({
            where: {
              email: req.body.email,
            },
          });
          return !result;
        }),
      // status: string().test(
      //   "check-status",
      //   "Trang thai khong hop le",
      //   (value) => {
      //     value = +value;
      //     if (!isNaN(value) && (value === 0 || value === 1)) {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   }
      // ),
      password: string().required("Password bắt buộc phải nhâp"),
    });
    console.log("body", body);
    // const body = await req.body;
    if (body) {
      await bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(body.password, salt, function (err, hash) {
          User.create({
            name: body.name,
            email: body.email,
            password: hash,
            status: body.status === 1 ? true : false,
          });
        });
      });
      req.flash("success", "Đăng ký thành công");

      return res.redirect("/users");
    } else {
      req.flash("errorAdd", "Đăng ký thất bại");
    }
    return res.redirect("/users/add");
  },

  login: (req, res) => {
    res.render("users/login", { req });
  },
  handleLogin: async (req, res) => {
    const { email, password } = await req.body;
    //... fetch user from a db etc.
    const checkUser = await User.findOne({
      attributes: ["name", "email", "password"],
      where: {
        email: email,
        status: true,
      },
    });

    if (checkUser) {
      bcrypt.compare(password, checkUser.password, function (err, result) {
        if (result) {
          req.flash("success", "Đăng nhập thành công");
          req.session.user = checkUser.name;
          res.redirect("/");
        } else {
          req.flash("error", "Mật khẩu không chính xác");
          res.redirect("/users/login");
        }
      });
    } else {
      req.flash("emailError", "Email không chính xác");
      res.redirect("/users/login");
    }
  },

  edit: async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("Không tìm thấy user");
      }
      res.render("users/edit", { user });
    } catch (e) {
      next(e);
    }
  },
  handleEdit: async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const status = await User.update(
      {
        name: body.name,
        email: body.email,
        status: body.status === "1" ? true : false,
      },
      {
        where: { id },
      }
    );
    return res.redirect("/users");
  },
  delete: async (req, res) => {
    const { id } = req.params;
    await User.destroy({
      where: {
        id: id,
      },
    });
    res.redirect("/users");
  },
};
