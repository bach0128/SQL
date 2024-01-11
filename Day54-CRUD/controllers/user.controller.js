const userModel = require("../models/user.model");
const { string } = require("yup");

module.exports = {
  index: async (req, res, next) => {
    let users;
    const { status, keyword } = req.query;
    try {
      users = await userModel.all(status, keyword);
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
        .test("check-email", "Email đã được sử dụng", async (value) => {
          const result = await userModel.checkEmail(value);
          return !result.length;
        }),
      status: string().test(
        "check-status",
        "Trang thai khong hop le",
        (value) => {
          value = +value;
          if (!isNaN(value) && (value === 0 || value === 1)) {
            return true;
          } else {
            return false;
          }
        }
      ),
    });

    if (body) {
      await userModel.add(body);
      // res.flash("msg", "Thêm người dùng thành công");
      return res.redirect("/users");
    }
    return res.redirect("/users/add");
  },
  delete: async (req, res, next) => {
    let user;
    const { id } = req.query;
    try {
      user = await userModel.getUser(id);
    } catch (e) {
      return next(e);
    }
    res.render(`users/delete`, { user: user[0] });
  },

  handleDelete: async (req, res) => {
    const { id } = req.query;
    if (id) {
      await userModel.delete(id);
      // res.flash("delete", "Xóa người dùng thành công");
      return res.redirect("/users");
    }
  },
  edit: async (req, res, next) => {
    let user;
    const { id } = req.query;
    try {
      user = await userModel.getUser(id);
    } catch (e) {
      return next(e);
    }
    res.render(`users/edit`, { user: user[0] });
  },
  handleEdit: async (req, res) => {
    const { id } = req.query;
    const body = await req.validate(req.body, {
      id: id,
      name: string().required("Tên bắt buộc phải nhâp"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng")
        .test("check-email", "Email đã được sử dụng", async (value) => {
          const result = await userModel.checkEmail(value);
          return !result.length;
        }),
      status: string().test(
        "check-status",
        "Trang thai khong hop le",
        (value) => {
          value = +value;
          if (!isNaN(value) && (value === 0 || value === 1)) {
            return true;
          } else {
            return false;
          }
        }
      ),
    });
    console.log(body);
    userModel.edit(req.body);

    if (body) {
      await userModel.edit(body);
      // res.flash("msg", "Thêm người dùng thành công");
      return res.redirect("/users");
    }
    return res.redirect("/users/edit");
  },
};
