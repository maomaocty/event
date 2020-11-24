$(function () {
    // 点击去注册账号显示注册页面
    $("#gotoRegi").click(function () {
        // console.log("被点击了");
        // 让注册区域显示出来
        $(".regiBox").show()
        // 让登录区域隐藏
        $(".loginBox").hide()
    })
    // 点击去登录显示登录页面
    $("#gotoLogin").click(function () {
        // console.log("被点击了");
        // 让注册页面隐藏
        $(".regiBox").hide()
        // 让登录页面显示
        $(".loginBox").show()
    })

    // 从layui中获取到表单form的功能
    let form = layui.form;
    // console.log(form);
    let layer = layui.layer;
    // console.log(layer);

    form.verify({
        pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        repass: function (value,item) {
            let pwd = $(".regiBox input[name=password]").val();
            if (value !== pwd) {
                return("两次密码不一致")
            }
        }
    })

    // 注册ajax
    $("#regiForm").on("submit", function (e) {
        e.preventDefault();

        // 收集表单数据
        let data = $(this).serialize();
        // let data = $(this).serialize()
        
        // 发送ajax请求接口，完成注册
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    // console.log("注册失败" + res.message);
                    return layer.msg("注册失败！" + res.message)
                    // return layer.msg("注册失败！" + res.message);
                    // return layer.msg("注册失败!" + res.message);
                }
                layer.msg("注册成功")
                // 注册成功显示登录页面
                $("#gotoLogin").click()
            }
        })
    })

    // $("#regiForm").on("submit", function (e) {
    //     e.preventDefault();
    
    //     // 收集表单数据
    //     let data = $(this).serialize();
    
    //     // 直接发送ajax请求
    //     $.ajax({
    //       type: "POST",
    //       url: "/api/reguser",
    //       data,
    //       success: function (res) {
    //         // console.log(res);
    
    //         if (res.status !== 0) {
    //           // return console.log("注册失败!" + res.message);
    //           return layer.msg("注册失败!" + res.message);
    //         }
    
    //         // console.log("注册成功!");
    //         layer.msg("注册成功!");
    //         // 注册成功，显示登陆form（去登录）
    //         $("#gotoLogin").click();
    //       },
    //     });
    //   });
    // 登录ajax
    $("#loginForm").on("submit", function (e) {
        e.preventDefault();

        // 收集表单数据
        let data = $(this).serialize()

        // 发送ajax请求接口，完成登录
        $.ajax({
            type: "POST",
            url: "/api/login",
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("登录失败")
                }
                // 登录成功后，跳转去后台

                // 需要延时效果
                localStorage.setItem("token", res.token);
                // localStorage.setItem("token", res.token);
                layer.msg(
                    "登录成功,即将跳转去后台",
                    {
                        time: 2000,
                    },
                    function () {
                        location.href = "index.html"
                    }
                )
            }
        })
    })
})