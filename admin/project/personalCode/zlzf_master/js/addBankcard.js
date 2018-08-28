/**
 * Created by admin on 2018/7/30.
 */
//表单校验
function isCheck() {
    // 身份证号码为18位，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var id_numbe = $('#id_number').val();
    if(id_numbe.length == 0) {
        showModal("请输入身份证！");
        //$('#id_number').focus();
        return false;
    }
    var reg = /^(\d{14}|\d{17})(\d|[xX])$/;
    if(id_numbe.length != 18 || !reg.test(id_numbe)) {
        showModal("请输入有效的身份证！");
        //$('#id_number').focus();
        return false;
    }
    //判断是否填写姓名
    var full_Name = $("#Full_Name").val();
    var name_reg=/((^[\u4E00-\u9FA5]{2,5}$)|(^[a-zA-Z]+[\s\.]?([a-zA-Z]+[\s\.]?){0,4}[a-zA-Z]$))/;
    if(full_Name.length == 0 || !name_reg.test(full_Name)){
        showModal("请输入您的真实姓名！");
        //$('#Full_Name').focus();
        return false;
    }
    //判断银行卡号
    var cardNo=$("#haorooms").val();
    cardNo=cardNo.replace(/\s/ig,'');
    if(cardNo.length < 16){
        showModal("银行卡号至少为16位的数字！");
        //$('#haorooms').focus();
        return false;
    }else{
        //保存银行卡号到隐藏域
        $("#cardNo").val(cardNo);
    }
    //判断银行行别
    if($("#opTio").val() == 0){
        showModal("请输入银行行别！");
        //$('#opTio').focus();
        return false;
    }else{
        //保存银行行别到隐藏域
        $("#bankCategory").val($("#opTio").val());
    }
    //验证手机号
    var phoneNum = $('#phoneNum').val();
    if(phoneNum.length == 0) {
        showModal("请输入手机号码！");
        //$('#phoneNum').focus();
        return false;
    }
    var myreg = /^(((1[3-8]{1}[0-9]{1}))+\d{8})$/;
    if(phoneNum.length != 11 || !myreg.test(phoneNum)) {
        showModal("请输入有效的手机号码！");
        //$('#phoneNum').focus();
        return false;
    }
    //判断验证码
    var SMS_verification = $("#SMS_verification").val();
    if(SMS_verification.length == 0){
        showModal("请输入验证码！");
        //$('#SMS_verification').focus();
        return false;
    }
    return true;
}

$(function() {
    //设置银行卡输入格式设置
    $('#haorooms').on('keyup', function(e) {
        //只对输入数字时进行处理
        if((e.which >= 48 && e.which <= 57) ||
            (e.which >= 96 && e.which <= 105 )){
            //获取当前光标的位置
            var caret = this.selectionStart;
            //获取当前的value
            var value = this.value;
            //从左边沿到坐标之间的空格数
            var sp =  (value.slice(0, caret).match(/\s/g) || []).length;
            //去掉所有空格
            var nospace = value.replace(/\s/g, '');
            //重新插入空格
            var curVal = this.value = nospace.replace(/(\d{4})/g, "$1 ").trim();
            //从左边沿到原坐标之间的空格数
            var curSp = (curVal.slice(0, caret).match(/\s/g) || []).length;
            //修正光标位置
            this.selectionEnd = this.selectionStart = caret + curSp - sp;
        }

        var cardNo=$("#haorooms").val();
        //清除格式获取卡号
        cardNo=cardNo.replace(/\s/ig,'');
        //校验卡号位数小于16（非法卡号）退出
        if(cardNo.length == 6 || cardNo.length == 8 || cardNo.length == 10){
            //根据卡号验证行别及反显行别
            $.ajax({
                url: "getCardBin.do",
                type:"post",
                async: false,
                dataType:"text",
                data: {
                    cardNo:cardNo
                },
                success:function(data) {
                    //遍历银行行别select列表显示返显行别
                    selBankType(data);
                },
                error: function(){
                    showModal('出现异常！');
                }
            });
        }else{
            return;
        }

    })


});

//根据value设置选中
function selBankType(data){
    var checkVal=$("#opTio").find("option:selected").val();
    if(data!=null && data != checkVal){
        $("#opTio option[value='"+checkVal+"']").removeAttr("selected");//根据值去除选中状态
        $("#opTio option[value='"+data+"']").prop("selected",true);//根据值追加选中状态
    }
}

//确认按钮提交表单
function submitForm() {
    var flag = false; //抑制表单提交自动页面跳转
    var errMsg; 	  //错误提示信息

    if(isCheck()){
        var banktype = $('#bankCategory').val();
        var phoneNum = $('#phoneNum').val();
        var cardNo = $('#cardNo').val();
        var id_numbe = $('#id_number').val();
        var	SMS_verification = $('#SMS_verification').val();
        var full_Name = $('#Full_Name').val();
        var appSeqId = sessionStorage.getItem('appSeqId');
        $.ajax({
            url: 'addBankCard.do',
            type: 'post',
            async: true,
            dataType:"json",
            data: {
                bankType:banktype,
                bankCardNum:cardNo,
                reservePhoneNo:phoneNum,
                certId:id_numbe,
                identifyingCode:SMS_verification,
                userName:full_Name,
                appSeqId:appSeqId
            },
            success: function(data){
                //判断响应码：RC00 成功以外弹框显示错误信息
                if('RC00' != data.resCode){
                    errMsg = data.resMsg;
                    //弹框显示错误信息
                    showModal(errMsg);
                    flag = true;
                }else{
                    //实名认证状态(客户号CP)
                    sessionStorage.setItem('customId', data.customId);
                    sessionStorage.setItem('resv', data.resv);
                    //跳转至设置我的店铺页面
                    changeURL();
                }
            },
            error: function(){
                showModal('出现异常！');
                flag = true;
            }
        })
        if(flag){
            return false;
        }
    }
}

//页面跳转
var changeURL = function(){
    var resv = sessionStorage.getItem('resv');
    if('0' == resv){
        window.location.href= "toMyShop.do";
    }else if('1' == resv){
        window.location.href= "mycenter/toPersonalCentral.do";
    }else if('2' == resv){
        window.location.href= "grap/authToGrapSuccess.do";
    }else{
        window.location.href= "toMyShop.do";
    }
}