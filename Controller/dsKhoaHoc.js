"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DSKhoaHocService_1 = require("../Services/DSKhoaHocService");
var DSKhoaHoc_1 = require("../Models/DSKhoaHoc");
// import { LoadDSKhoaHoc } from '../Controller/admin';
var NguoiDungService_1 = require("../Services/NguoiDungService");
var NgDung_1 = require("../Models/NgDung");
var DSNguoiDung_1 = require("../Models/DSNguoiDung");
var dsNguoiDungService_1 = require("../Services/dsNguoiDungService");
//import from 'jquery
var $ = require("jquery");
// ES6 Modules or TypeScript
var sweetalert2_1 = require("sweetalert2");
require("sweetalert2/src/sweetalert2.scss");
var dkNgDungService = new NguoiDungService_1.DangKyNDService();
var dsNguoiDung = new DSNguoiDung_1.DSNguoiDung();
var nguoiDungService = new dsNguoiDungService_1.DSNguoiDungService();
var dsKhoaHoc = new DSKhoaHoc_1.DSKhoaHoc();
var khoaHocService = new DSKhoaHocService_1.KhoaHocService();
khoaHocService.LayDanhSachKhoaHoc().done(function (DSKH) {
    dsKhoaHoc.DSKH = DSKH;
    loadKhoaHoc(dsKhoaHoc.DSKH);
});
nguoiDungService.LayDanhSachNguoiDung().done(function (DSND) {
    dsNguoiDung.DSND = DSND;
});
$('body').delegate('.submit__signin', 'click', function () {
    var TaiKhoan = $('.TaiKhoan').val();
    var MatKhau = $('.MatKhau').val();
    // dkNgDungService.LayThongTinDangNhap(TaiKhoan, MatKhau);
    var errorLogin = dkNgDungService.LayThongTinDangNhap(TaiKhoan, MatKhau);
    return errorLogin;
});
var sessionLogin = [];
checkLogin();
function checkLogin() {
    var jsonSession = localStorage.getItem('ThongTinDangNhap');
    var listDK = JSON.parse(jsonSession);
    sessionLogin = listDK;
    if (sessionLogin !== null) {
        var menu_li = " <a href=\"#\" id=\"btn-sign-11\" class=\"btn-sm dropdown-toggle\" style=\" text-decoration: none !important;\n        outline: 0;\" type=\"button\" data-toggle=\"dropdown\"\n        aria-haspopup=\"true\" aria-expanded=\"false\"><span class=\"userName\" style=\"color: black;\">Hello:" + sessionLogin[0].TaiKhoan + "</span>\n        <span class=\"fa fa-user\" aria-hidden=\"true\" style=\"color: orange;\"></span>\n    </a>";
        var menu_drop = "\n        <div class=\"btn-group\" id=\"btn--group-drop\">\n        <div class=\"dropdown-menu drop__menu\">\n            <a class=\"dropdown-item\" id=\"name\" href=\"inform.html\">" + sessionLogin[0].HoTen + "</a>\n            <a class=\"dropdown-item\">My Course</a>\n            <a class=\"dropdown-item\" id=\"logOut\">Log Out</a>\n        </div>\n    </div>\n        ";
        $("#menu-log-reg ul li:nth-child(1)").after(menu_li);
        $("#menu-log-reg ul li:nth-child(1)").before(menu_drop);
        $("#button__sign").remove();
        $('#button__regis').remove();
    }
}
exports.checkLogin = checkLogin;
$('body').delegate('#logOut', 'click', function () {
    localStorage.removeItem('ThongTinNguoiDung');
    localStorage.removeItem('ThongTinDangNhap');
    localStorage.removeItem('Pass');
    sweetalert2_1.default({
        type: 'success',
        title: 'Log-Out success!',
        // text: 'Please, sign-in!',
        animation: false,
        customClass: 'animated tada',
    }).then(function (value) {
        window.location.reload();
    });
});
$('body').delegate('.submit-regis', 'click', function () {
    var FirstName = $('.HoTen').val();
    var LastName = $('.HoTen').val();
    var TaiKhoan = $('.Account').val();
    var MatKhau = $('.Password').val();
    var Email = $('.Email').val();
    var SoDT = $('.phoneNumber').val();
    var ngDung = new NgDung_1.NguoiDung();
    // dangKy.HoTen = FirstName;
    ngDung.TaiKhoan = TaiKhoan;
    ngDung.MatKhau = MatKhau;
    ngDung.HoTen = FirstName + LastName;
    ngDung.Email = Email;
    ngDung.SoDT = SoDT;
    ngDung.MaLoaiNguoiDung = 'HV';
    console.log(ngDung);
    // $('#submit-regis').removeAttr('a[href="#sign-up-regis"]');
    dsNguoiDung.ThemNguoiDung(ngDung);
    dkNgDungService.DangKyNguoiDung(ngDung).done(function (data) {
        console.log(data);
    });
    sweetalert2_1.default({
        type: 'success',
        title: 'Sign-up success!',
        text: 'Please, sign-in!',
        animation: false,
        customClass: 'animated tada',
    }).then(function (value) {
        window.location.href = "";
    });
});
$('body').delegate('.btn--admin', 'click', function () {
    getStorage();
    localStoragePass();
    var TaiKhoan = dsNguoiDung.DSND[0].TaiKhoan;
    var tk = dsNguoiDung.LayThongTinNguoiDung(TaiKhoan);
    $('#FirstName').val(tk.HoTen);
    $('#Email').val(tk.Email);
    // $('#Phone').val(tk.SoDT);
    var MatKhau = passW;
    var FirstName = $('#FirstName').val();
    // let LastName = $('#LastName').val();
    var HoTen = FirstName;
    var Email = $('#Email').val();
    var Phone = $('#Phone').val();
    var MaLoaiNguoiDung = dsNguoiDung.DSND[0].MaLoaiNguoiDung;
    var TenLoaiNguoiDung = dsNguoiDung.DSND[0].TenLoaiNguoiDung;
    dsNguoiDung.CapNhatThongTinNguoiDung(TaiKhoan, MatKhau, HoTen, Email, Phone, MaLoaiNguoiDung, TenLoaiNguoiDung);
    nguoiDungService.UpdateNguoiDung(TaiKhoan, MatKhau, HoTen, Email, Phone, MaLoaiNguoiDung, TenLoaiNguoiDung).done(function (data) {
        console.log(data);
    });
});
$('body').delegate('.btn-getInform', 'click', function (ev) {
    getStorage();
    ev.preventDefault();
    $("#FirstName").val(thongtin[0].HoTen);
    $("#LastName").val(thongtin[0].HoTen);
    $("#Email").val(thongtin[0].Email);
    $("#Phone").val(thongtin[0].SoDT);
});
// $('body').delegate('#name', 'click', function(ev){
//     getStorage();
//     ev.preventDefault();
//     $("#FirstName").val(thongtin[0].HoTen);
//     $("#LastName").val(thongtin[0].HoTen);
//     $("#Email").val(thongtin[0].Email);
//     $("#Phone").val(thongtin[0].SoDT);
// });
// ThongTinCaNhan();
// function ThongTinCaNhan() {
//     getStorage();
//     $("#FirstName").val(thongtin[0].HoTen);
//     $("#LastName").val(thongtin[0].HoTen);
//     $("#Email").val(thongtin[0].Email);
//     $("#Phone").val(thongtin[0].SoDT);
// }
var thongtin = [];
var thongtindangnhap = [];
function getStorage() {
    var sessionLogin = localStorage.getItem("ThongTinDangNhap");
    if (sessionLogin === null) {
        window.location.href = "index.html";
    }
    else {
        var list = JSON.parse(sessionLogin);
        thongtindangnhap = list;
        dkNgDungService.LayThongTinNguoiDung(thongtindangnhap[0].TaiKhoan);
        var jsonNguoiDung = localStorage.getItem("ThongTinNguoiDung");
        var thongtinnguoidung = JSON.parse(jsonNguoiDung);
        thongtin = thongtinnguoidung;
        dsNguoiDung.DSND = thongtinnguoidung;
    }
}
$('body').delegate('.btnChangePass', 'click', function () {
    getStorage();
    localStoragePass();
    var TaiKhoan = dsNguoiDung.DSND[0].TaiKhoan;
    var tk = dsNguoiDung.LayThongTinNguoiDung(TaiKhoan);
    // // tk = passW;
    $('#FirstName').val(tk.HoTen);
    $('#Email').val(tk.Email);
    $('#Phone').val(tk.SoDT);
    $('#oldPass').val(tk.MatKhau);
    var MatKhau = passW;
    var newMatKhau = $('#newPass').val();
    var confirmPassword = $('#confirmPass').val();
    var HoTen = $('#FirstName').val();
    var Email = $('#Email').val();
    var Phone = $('#Phone').val();
    var MaLoaiNguoiDung = dsNguoiDung.DSND[0].MaLoaiNguoiDung;
    var TenLoaiNguoiDung = dsNguoiDung.DSND[0].TenLoaiNguoiDung;
    if (MatKhau === "") {
        sweetalert2_1.default({
            type: 'error',
            title: 'Password can not be blank!',
            text: 'Please, input password again!',
            animation: false,
            customClass: 'animated tada',
        }).then(function (value) {
            window.location.href = '';
        });
    }
    else if (!MatKhau) {
        sweetalert2_1.default({
            type: 'error',
            title: ' Enter the wrong OldPassword !',
            text: 'Please, input oldpassword again!',
            animation: false,
            customClass: 'animated tada',
        }).then(function (value) {
            window.location.href = '';
        });
    }
    else if (MatKhau === newMatKhau) {
        sweetalert2_1.default({
            type: 'error',
            title: 'New password can not be same Old password!',
            text: 'Please, input password again!',
            animation: false,
            customClass: 'animated tada',
        }).then(function (value) {
            window.location.href = '';
        });
    }
    else if (newMatKhau !== confirmPassword) {
        sweetalert2_1.default({
            type: 'error',
            title: 'Input the wrong password!',
            text: 'Please, input password again!',
            animation: false,
            customClass: 'animated tada',
        }).then(function (value) {
            window.location.href = '';
        });
    }
    else if (newMatKhau === "") {
        sweetalert2_1.default({
            type: 'error',
            title: 'New password can not be blank!',
            text: 'Please, input password again!',
            animation: false,
            customClass: 'animated tada',
        }).then(function (value) {
            window.location.href = '';
        });
    }
    else if (confirmPassword === "") {
        sweetalert2_1.default({
            type: 'error',
            title: 'Confirm password can not be blank!',
            text: 'Please, input password again!',
            animation: false,
            customClass: 'animated tada',
        }).then(function (value) {
            window.location.href = '';
        });
    }
    else {
        sweetalert2_1.default({
            type: 'success',
            title: 'Update password success!',
            text: 'Please, login again!',
            animation: false,
            customClass: 'animated tada',
        }).then(function (value) {
            window.location.href = '';
        });
    }
    dsNguoiDung.CapNhatThongTinNguoiDung(TaiKhoan, newMatKhau, HoTen, Email, Phone, MaLoaiNguoiDung, TenLoaiNguoiDung);
    nguoiDungService.UpdateNguoiDung(TaiKhoan, newMatKhau, HoTen, Email, Phone, MaLoaiNguoiDung, TenLoaiNguoiDung).done(function (data) {
        console.log(data);
        return;
    });
    var jsonPass = JSON.stringify(newMatKhau);
    localStorage.setItem('Pass', jsonPass);
});
var passW = [];
function localStoragePass() {
    var jsonPass = localStorage.getItem('Pass');
    var list = JSON.stringify(jsonPass);
    passW = list;
}
function loadKhoaHoc(DSKH) {
    var noidungKH = '';
    var click = '';
    for (var i = 3; i < DSKH.length; i++) {
        var khoaHoc = DSKH[i];
        noidungKH = "\n        <div class=\"grid-price mt-2\" id=\"code_course\" maKhoaHoc=\"" + khoaHoc.MaKhoaHoc + "\">\n            <span><i class=\"fa fa-key\"></i>" + khoaHoc.MaKhoaHoc + "</span>\n        </div>\n        <div class=\"grid-price mt-2\" id=\"views_course\">\n            <span><i class=\"fa fa-eye\"></i>" + khoaHoc.LuotXem + "</span>\n        </div>\n        <div class=\"grid-price mt-2\" id=\"people_course\">\n            <span><i class=\"fa fa-user\"></i>" + khoaHoc.NguoiTao + "</span>\n        </div>\n        ";
        click += "\n            <div class=\"inner-pro-course\">\n                <a href=\"Detail.html\" id=\"quickView\" class=\"link-pro-course\" maKhoaHoc=\"" + khoaHoc.MaKhoaHoc + "\">Quick View</a>\n            </div>\n        ";
        break;
    }
    $('.product_price h4').after(noidungKH);
    $('.pro-info-course').html(click);
}
$('body').delegate('.link-pro-course', 'click', function () {
    // loadChiTiet()
    var maKH = $(this).attr('makhoahoc');
    khoaHocService.LayChiTietKhoaHoc(maKH);
});
layDetailCourse();
function layDetailCourse() {
    loadDetailCoure();
    var views = '';
    var code = '';
    var moTa = '';
    views += "\n            <span class=\"star-text\">\n                There were\n            <span class=\"views--\">\n                <strong>\n                    " + detailCourse.LuotXem + "\n                </strong>\n            </span>\n                views\n            </span>\n            ";
    code += "\n                <p class=\"Ma-course\">M\u00E3: " + detailCourse.MaKhoaHoc + "</p>\n            ";
    moTa += "\n                <div class=\"single_page\">" + detailCourse.MoTa + "</div>\n            ";
    $('.detail--title h3').after(code);
    $('.detail-rating span:nth-child(4)').html(views);
    $('#moTa').html(moTa);
}
function ghiDanhKhoaHoc() {
    loadDetailCoure();
    var jsonGhiDanh = localStorage.getItem('ThongTinDangNhap');
    if (jsonGhiDanh !== null) {
        var list = JSON.parse(jsonGhiDanh);
        dsNguoiDung.DSND = list;
        khoaHocService.GhiDanhKhoaHoc(detailCourse.MaKhoaHoc, dsNguoiDung.DSND[0].TaiKhoan);
    }
    else {
        sweetalert2_1.default({
            type: 'warning',
            title: 'Please register before registring for this course!',
            text: 'Please regis account?',
            animation: false,
            customClass: 'animated tada',
        }).then(function (willDelete) {
            window.location.href = '';
        });
    }
}
$('.btnGhiDanh').click(function () {
    // dsGhiDanh();
    var jsonNgDung = localStorage.getItem('ThongTinDangNhap');
    if (jsonNgDung == null) {
        sweetalert2_1.default({
            type: 'warning',
            title: 'Please register before registring for this course!',
            text: 'Please regis account?',
            animation: false,
            customClass: 'animated tada',
        }).then(function (ev) {
            // window.location.href = '';
        });
    }
    else {
        sweetalert2_1.default({
            type: 'warning',
            title: 'Do You want to regis!',
            text: 'Are you sure you want to regis this Course?',
            animation: false,
            customClass: 'animated tada',
        }).then(function (willDelete) {
            if (willDelete) {
                ghiDanhKhoaHoc();
            }
        });
    }
});
// let MangdskhDaGhiDanh: any = [];
// let User = [];
// ThongTinGhiDanhKH();
// function ThongTinGhiDanhKH() {
//     let jsonNgDung = localStorage.getItem('ThongTinDanhNhap');
//     if (jsonNgDung !== null) {
//         let kp = JSON.parse(jsonNgDung);
//         User = kp;
//         khoaHocService.LayTTKHNguoiDungDK(User[0].TaiKhoan);
//         let jsonDSKH = localStorage.getItem('ThongTinGhiDanhKhoaHoc');
//         MangdskhDaGhiDanh = jsonDSKH;
//     }
// }
var dsgd = [];
var thongtinGhiDanh = [];
function dsGhiDanh() {
    var changeButton = '';
    var jsonGhiDanh = localStorage.getItem('ThongTinDangNhap');
    if (jsonGhiDanh !== null) {
        var listGhiDanh = JSON.parse(jsonGhiDanh);
        thongtinGhiDanh = listGhiDanh;
        khoaHocService.LayTTKHNguoiDungDK(thongtinGhiDanh[0].TaiKhoan);
        var ghiDanh = localStorage.getItem('ThongTinGhiDanhKhoaHoc');
        if (ghiDanh !== null) {
            var listGD = JSON.parse(ghiDanh);
            dsgd = listGD;
            for (var i = 0; i < dsgd.length; i++) {
                if (dsgd[i].MaKhoaHoc === detailCourse.MaKhoaHoc) {
                    changeButton += "\n                    <p class=\"register--course\">\n                        <button id=\"registerCourse\" class=\"btn btn-success btnRegisterCourse btnGhiDanh waves-effect waves-light\">You have registed</button>\n                        <button class=\"js-modal-btn btn btn-primary waves-effect waves-light\" id=\"btnViewDemo\" data-video-id=\"71iYz7kkh4Q\">Course Demo</button>\n                    </p>\n                    ";
                    $('#registerCourse').prop('disabled', true);
                    sweetalert2_1.default({
                        type: 'warning',
                        title: 'You have registed!',
                        text: 'Please Enter "OK"?',
                        animation: false,
                        customClass: 'animated tada',
                    });
                }
            }
        }
    }
    $('.change-button p:nth-child(2)').html(changeButton);
}
// $('.link-pro-course').delegate(getCourseDetail, 'click');
var detailCourse = [];
function loadDetailCoure() {
    var detail = localStorage.getItem('ChiTietKhoaHoc');
    if (detail === null) {
        window.location.href = 'course.html';
    }
    var listDetail = JSON.parse(detail);
    detailCourse = listDetail;
}
getKH();
function getKH() {
    var jsonKH = localStorage.getItem('DSKH');
    var listKH = JSON.parse(jsonKH);
    dsKhoaHoc.DSKH = listKH;
}
// function loadChiTiet(){
//     getKH();
//     let click ='';
//     for(let i = 0; i < dsKhoaHoc.DSKH[0].length; i++){
//         let chiTiet = dsKhoaHoc.DSKH[i];
//         click += `
//             <div class="inner-pro-course">
//                 <a href="Detail.html" id="quickView" class="link-pro-course" maKhoaHoc=${chiTiet.MaKhoaHoc}>Quick View</a>
//             </div>
//         `;
//     }
//     $('.pro-info-course').after(click);
// }
