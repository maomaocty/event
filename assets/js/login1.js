$(function () {
    // 点击去注册显示注册页面
    $("#gotoRegi").click(function () {
        // console.log("被点击了");
        // 注册页面显示
        $(".regiBox").show()
        // 登录页面隐藏
        $(".loginBox").hide()
    })
    // 点击去登录显示登录页面
    $("#gotoLogin").click(function () {
        // console.log("被点击了");
        // 注册页面隐藏
        $(".regiBox").hide()
        // 登录页面显示
        $(".loginBox").show()
    })
    // 获取layui中的表单数据
    let form = layui.form;
    let layer = layui.layer;
    // 表单校验
    form.verify({
        pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        rempass: function (value, item) {
            let pwd = $(".regiBox input[name=password]").val();
            if (value !== pwd) {
                return("两次密码不一致")
            }
        }
    })

    // 注册ajax

    $("#regiForm").on("submit", function (e) {
        e.preventDefault()
        let data = $(this).serialize()

        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("注册失败！" + res.message)
                }

                layer.msg("注册成功")
                // 注册成功显示登录页面
                $("#gotoLogin").click()
            }
        })
    })

    // 登录ajax
    $("#loginForm").on("submit", function (e) {
        e.preventDefault()
        let data = $(this).serialize()
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
                localStorage.setItem("token", res.token);
                layer.msg(
                    "登录成功,即将跳转去后台",
                    {
                        time:2000
                    },
                    function () {
                        location.href = "index.html"
                    }
                )
            }
        })
    })
})