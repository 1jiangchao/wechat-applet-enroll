
const app = getApp();
Page({
  data: {
    isGet: false,
    sec: 60,
    phoneNumber: ''
  },
  getInputPhoneNumber: function (e) {
    var that = this;
    var phone = e.detail.value;
    that.setData({
      phoneNumber: phone
    })
    console.log(that.data.phoneNumber);
  },
  getCode: function (e) {
    var self = this;
    var mobile = self.data.phoneNumber;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (mobile == '') {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none',
        duration: 1000
      })
    } else if (mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    } else if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    }
    else {
      var url = "";
      wx.showLoading({
        title: '正在获取验证码中......',
      })
      wx.request({
        url: "",
        method: 'POST',
        data: {
          no: '1635050307',
          mobile: mobile
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sign': ''
        },
        success: (res) => {
          if (res.data.error) {
            wx.showToast({
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000,
            })
          }
        }
      })
      self.setData({ isGet: true })
      console.log('11111')
      var remain = 60;
      var time = setInterval(function () {
        if (remain == 1) {
          clearInterval(time)
          self.setData({
            sec: 60,
            isGet: false
          })
          return false
        }
        remain--;
        console.log('111Z11')
        self.setData({
          sec: remain
        })
      },
        1000)
    }
  },
  formSubmit: function (e) {
    console.log(e);
    var username = e.detail.value.username;
    var mobile = e.detail.value.mobile;
    var newpwd = e.detail.value.newpwd;
    var pwd = e.detail.value.pwd;
    var captcha_code = e.detail.value.captcha_code;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (mobile == '' || newpwd == '' || pwd == '' || captcha_code == '' || username == '') {
      console.log(1111);
      wx.showToast({
        title: '请输入信息',
        icon: 'none',
        duration: 1000
      })
    } else if (newpwd != pwd) {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none',
        duration: 1000
      })
    } else if (mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    } else if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
      return false;
    } else {
      var url = "";
      wx.showLoading({
        title: '正在注册中......',
      })
      wx.request({
        url: "",
        method: 'POST',
        data: {
          no: '1635050307',
          mobile: mobile,
          pwd: pwd,
          username: username,
          captcha_code: captcha_code
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'sign': ''
        },
        success: (res) => {
          console.log(res.data);
          if (res.data.error) {
            wx.showToast({
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000,
            })
            wx.navigateTo({
              url: '',
            });
          }
        }
      })
    }
  },
})  