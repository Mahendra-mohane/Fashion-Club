const express = require("express");
const { CartModel } = require("../models/cart.model");

const cartRouter = express.Router();

cartRouter.post("/addtocart", async (req, res) => {
  try {
    const payload = req.body;
    console.log(payload);

    let getdata = await CartModel.find({ title: payload.title });

    if (getdata.length > 0) {
      res.send({ msg: "Product is already present in cart" });
    } else {
      const add = new CartModel(payload);
      await add.save();
      res.send({ msg: "Product Added To Cart" });
    }
  } catch (err) {
    res.send(err.message);
  }
});

cartRouter.get("/get", async (req, res) => {
  const loginid = req.body.user;
  let data = await CartModel.find({ user: loginid });
  res.send(data);
});

cartRouter.patch("/dec/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  const loginid = payload.user;
  const datapresentindb = await CartModel.findOne({ _id: id });
  const idfromdb = datapresentindb.user;

  console.log(datapresentindb);
  let quantity = datapresentindb.quantity;
  datapresentindb.quantity = quantity - 1;

  if (datapresentindb.quantity == 0) {
    await CartModel.findByIdAndDelete({ _id: id });

    res.send({
      msg: ` cart product with id: ${id} has been deleted because its quantity becomes 0`,
    });
  } else {
    try {
      if (loginid != idfromdb) {
        res.send({ msg: "You are not authorized." });
      } else {
        await CartModel.findByIdAndUpdate({ _id: id }, datapresentindb);

        res.send({
          msg: ` quantity of cart product with id: ${id} has been decremented`,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  }
});

cartRouter.patch("/inc/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;

  const loginid = payload.user;
  const datapresentindb = await CartModel.findOne({ _id: id });
  const idfromdb = datapresentindb.user;

  console.log(datapresentindb);
  let quantity = datapresentindb.quantity;
  datapresentindb.quantity = quantity + 1;

  try {
    if (loginid != idfromdb) {
      res.send({ msg: "You are not authorized." });
    } else {
      await CartModel.findByIdAndUpdate({ _id: id }, datapresentindb);

      res.send({
        msg: ` quantity of cart product with id: ${id} has been incremented`,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
});



cartRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    await CartModel.findByIdAndDelete({ _id: id });
    res.send({"msg":"Product has been deleted"})
})



module.exports = {
  cartRouter,
};
