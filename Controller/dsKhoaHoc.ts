import { KhoaHocService } from '../Services/DSKhoaHocService';
import { DSKhoaHoc } from '../Models/DSKhoaHoc';
// import { LoadDSKhoaHoc } from '../Controller/admin';
import { DangKyNDService } from '../Services/NguoiDungService';
import { NguoiDung } from '../Models/NgDung';
import { DSNguoiDung } from '../Models/DSNguoiDung';
import { DSNguoiDungService } from '../Services/dsNguoiDungService';

//import from 'jquery
import * as $ from 'jquery';
// ES6 Modules or TypeScript
import swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

var dkNgDungService = new DangKyNDService();

let dsNguoiDung = new DSNguoiDung();

let nguoiDungService = new DSNguoiDungService();

let dsKhoaHoc = new DSKhoaHoc();

let khoaHocService = new KhoaHocService();

khoaHocService.LayDanhSachKhoaHoc().done(function (DSKH) {
    dsKhoaHoc.DSKH = DSKH;
    loadKhoaHoc(dsKhoaHoc.DSKH);
});

nguoiDungService.LayDanhSachNguoiDung().done(function (DSND) {
    dsNguoiDung.DSND = DSND;
    checkLogin(dsNguoiDung.DSND);
    ThongTinCaNhan(dsNguoiDung.DSND);
});

$('body').delegate('.submit__signin', 'click', function () {
    let TaiKhoan = $('.TaiKhoan').val();
    let MatKhau = $('.MatKhau').val();

    // dkNgDungService.LayThongTinDangNhap(TaiKhoan, MatKhau);
    let errorLogin = dkNgDungService.LayThongTinDangNhap(TaiKhoan, MatKhau);

    return errorLogin;
});

// JSON.parse(jsonSession)

// let sessionLogin = [];

export function checkLogin(DSND) {
    getStorage();
    let jsonSession = localStorage.getItem('ThongTinDangNhap') ? JSON.parse(localStorage.getItem('ThongTinDangNhap')) : [];
    let listDK = jsonSession;
    DSND = listDK;
    if (DSND[0].MaLoaiNguoiDung === 'HV') {
        let menu_li = ` <a href="#" id="btn-sign-11" class="btn-sm dropdown-toggle" style=" text-decoration: none !important;
            outline: 0;" type="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false"><span class="userName" style="color: black;" TaiKhoan=${DSND[0].TaiKhoan}>Hello:${DSND[0].TaiKhoan}</span>
            <span class="fa fa-user" aria-hidden="true" style="color: orange;"></span>
        </a>`;

        let menu_drop = `
            <div class="btn-group" id="btn--group-drop">
            <div class="dropdown-menu drop__menu">
                <a class="dropdown-item" id="name" href="inform.html">${DSND[0].HoTen}</a>
                <a class="dropdown-item" href="inform.html">My Course</a>
                <a class="dropdown-item" id="logOut">Log Out</a>
            </div>
        </div>
            `;

        $("#menu-log-reg ul li:nth-child(1)").after(menu_li);
        $("#menu-log-reg ul li:nth-child(1)").before(menu_drop);
        $("#button__sign").remove();
        $('#button__regis').remove();

    } else if (DSND[0].MaLoaiNguoiDung === 'GV') {
        let menu_li = ` <a href="#" id="btn-sign-11" class="btn-sm dropdown-toggle" style=" text-decoration: none !important;
            outline: 0;" type="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false"><span class="userName" style="color: black;" TaiKhoan=${DSND[0].TaiKhoan}>Hello:${DSND[0].TaiKhoan}</span>
            <span class="fa fa-user" aria-hidden="true" style="color: orange;"></span>
        </a>`;

        let menu_drop = `
            <div class="btn-group" id="btn--group-drop">
            <div class="dropdown-menu drop__menu">
                <a class="dropdown-item" id="name" href="admin.html">${DSND[0].HoTen}</a>
                <a class="dropdown-item" id="logOut">Log Out</a>
            </div>
        </div>
            `;

        $("#menu-log-reg ul li:nth-child(1)").after(menu_li);
        $("#menu-log-reg ul li:nth-child(1)").before(menu_drop);
        $("#button__sign").remove();
        $('#button__regis').remove();
    }
}


$('body').delegate('#logOut', 'click', function () {
    localStorage.removeItem('ThongTinNguoiDung');
    localStorage.removeItem('ThongTinDangNhap');
    localStorage.removeItem('Pass');
    swal({
        type: 'success',
        title: 'Log-Out success!',
        // text: 'Please, sign-in!',
        animation: false,
        customClass: 'animated tada',
        // timer: 10000
    }).then((value) => {
        window.location.href = 'index.html';
    });
});

$('body').delegate('.submit-regis', 'click', function () {

    var FirstName = $('.HoTen').val();
    var LastName = $('.HoTen').val();
    var TaiKhoan = $('.Account').val();
    var MatKhau = $('.Password').val();
    var Email = $('.Email').val();
    var SoDT = $('.phoneNumber').val();

    var ngDung = new NguoiDung();

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

    swal({
        type: 'success',
        title: 'Sign-up success!',
        text: 'Please, sign-in!',
        animation: false,
        customClass: 'animated tada',
    }).then((value) => {
        window.location.href = "";
    });

});

$('body').delegate('.btn--admin', 'click', function () {
    getStorage();
    localStoragePass();

    let TaiKhoan = dsNguoiDung.DSND[0].TaiKhoan;
    let tk = dsNguoiDung.LayThongTinNguoiDung(TaiKhoan);

    $('#FirstName').val(tk.HoTen);
    $('#Email').val(tk.Email);
    // $('#Phone').val(tk.SoDT);

    let MatKhau = passW;
    let FirstName = $('#FirstName').val();
    // let LastName = $('#LastName').val();
    let HoTen = FirstName;
    let Email = $('#Email').val();
    let Phone = $('#Phone').val();
    let MaLoaiNguoiDung = dsNguoiDung.DSND[0].MaLoaiNguoiDung;
    let TenLoaiNguoiDung = dsNguoiDung.DSND[0].TenLoaiNguoiDung;

    dsNguoiDung.CapNhatThongTinNguoiDung(TaiKhoan, MatKhau, HoTen, Email, Phone, MaLoaiNguoiDung, TenLoaiNguoiDung);
    nguoiDungService.UpdateNguoiDung(TaiKhoan, MatKhau, HoTen, Email, Phone, MaLoaiNguoiDung, TenLoaiNguoiDung).done(function (data) {
        console.log(data);
    });
});

// $('#name').click(function(){
//     ThongTinCaNhan();
// });

// $('body').delegate('.btn-getInform', 'click', function (ev) {
//     getStorage();
//     ev.preventDefault();
//     $("#FirstName").val(thongtin[0].HoTen);
//     $("#LastName").val(thongtin[0].HoTen);
//     $("#Email").val(thongtin[0].Email);
//     $("#Phone").val(thongtin[0].SoDT);
// });

export function ThongTinCaNhan(DSND) {
    getStorage();
    DSND = thongtin;
    // let taiKhoan = $(this).attr("taikhoan");
    // let tk = dsNguoiDung.LayThongTinNguoiDung(taiKhoan);
    $("#FirstName").val(DSND[0].HoTen);
    $("#LastName").val(DSND[0].HoTen);
    $("#Email").val(DSND[0].Email);
    $("#Phone").val(DSND[0].SoDT);
}

let thongtin:any = [null];
let thongtindangnhap = [null];
export function getStorage() {
    var sessionLogin = localStorage.getItem("ThongTinDangNhap");
    if (sessionLogin === null) {
        // window.location.href = "index.html";

    }
    else {

        var list = JSON.parse(sessionLogin);
        thongtindangnhap = list;

        dkNgDungService.LayThongTinNguoiDung(thongtindangnhap[0].TaiKhoan);
        let jsonNguoiDung = localStorage.getItem("ThongTinNguoiDung") ? JSON.parse(localStorage.getItem('ThongTinNguoiDung')) : [];
        let thongtinnguoidung = jsonNguoiDung;   //JSON.parse(jsonNguoiDung)
        thongtin = thongtinnguoidung;
        dsNguoiDung.DSND = thongtinnguoidung;
    }
}

$('body').delegate('.btnChangePass', 'click', function () {
    getStorage();
    localStoragePass();

    let TaiKhoan = dsNguoiDung.DSND[0].TaiKhoan;
    let tk = dsNguoiDung.LayThongTinNguoiDung(TaiKhoan);
    // // tk = passW;
    $('#FirstName').val(tk.HoTen);
    $('#Email').val(tk.Email);
    $('#Phone').val(tk.SoDT);
    $('#oldPass').val(tk.MatKhau);

    let MatKhau = passW;

    let newMatKhau = $('#newPass').val();
    let confirmPassword = $('#confirmPass').val();
    let HoTen = $('#FirstName').val();
    let Email = $('#Email').val();
    let Phone = $('#Phone').val();
    let MaLoaiNguoiDung = dsNguoiDung.DSND[0].MaLoaiNguoiDung;
    let TenLoaiNguoiDung = dsNguoiDung.DSND[0].TenLoaiNguoiDung;
    if (MatKhau === "") {
        swal({
            type: 'error',
            title: 'Password can not be blank!',
            text: 'Please, input password again!',
            animation: false,
            customClass: 'animated tada',
        }).then((value) => {
            window.location.href = '';
        });

    } else if (!MatKhau) {
        swal({
            type: 'error',
            title: ' Enter the wrong OldPassword !',
            text: 'Please, input oldpassword again!',
            animation: false,
            customClass: 'animated tada',
        }).then((value) => {
            window.location.href = '';
        });
    } else if (MatKhau === newMatKhau) {
        swal({
            type: 'error',
            title: 'New password can not be same Old password!',
            text: 'Please, input password again!',
            animation: false,
            customClass: 'animated tada',
        }).then((value) => {
            window.location.href = '';
        });

    } else if (newMatKhau !== confirmPassword) {
        swal({
            type: 'error',
            title: 'Input the wrong password!',
            text: 'Please, input password again!',
            animation: false,
            customClass: 'animated tada',
        }).then((value) => {
            window.location.href = '';
        });

    } else if (newMatKhau === "") {
        swal({
            type: 'error',
            title: 'New password can not be blank!',
            text: 'Please, input password again!',
            animation: false,
            customClass: 'animated tada',
        }).then((value) => {
            window.location.href = '';
        });

    } else if (confirmPassword === "") {
        swal({
            type: 'error',
            title: 'Confirm password can not be blank!',
            text: 'Please, input password again!',
            animation: false,
            customClass: 'animated tada',
        }).then((value) => {
            window.location.href = '';
        });

    } else {
        swal({
            type: 'success',
            title: 'Update password success!',
            text: 'Please, login again!',
            animation: false,
            customClass: 'animated tada',
        }).then((value) => {
            window.location.href = '';
        });
    }

    dsNguoiDung.CapNhatThongTinNguoiDung(TaiKhoan, newMatKhau, HoTen, Email, Phone, MaLoaiNguoiDung, TenLoaiNguoiDung);
    nguoiDungService.UpdateNguoiDung(TaiKhoan, newMatKhau, HoTen, Email, Phone, MaLoaiNguoiDung, TenLoaiNguoiDung).done(function (data) {
        console.log(data);
        return;
    });
    let jsonPass = JSON.stringify(newMatKhau);
    localStorage.setItem('Pass', jsonPass);

});

let passW: any = [null];
function localStoragePass() {
    let jsonPass = localStorage.getItem('Pass');
    let list = JSON.stringify(jsonPass);
    passW = list;
}

function loadKhoaHoc(DSKH) {
    let noidungKH = '';
    let click = '';

    for (let i = 3; i < DSKH.length; i++) {
        let khoaHoc = DSKH[i];
        noidungKH = `
        <div class="grid-price mt-2" id="code_course" maKhoaHoc="${khoaHoc.MaKhoaHoc}">
            <span><i class="fa fa-key"></i>${khoaHoc.MaKhoaHoc}</span>
        </div>
        <div class="grid-price mt-2" id="views_course">
            <span><i class="fa fa-eye"></i>${khoaHoc.LuotXem}</span>
        </div>
        <div class="grid-price mt-2" id="people_course">
            <span><i class="fa fa-user"></i>${khoaHoc.NguoiTao}</span>
        </div>
        `;

        click += `
            <div class="inner-pro-course">
                <a href="Detail.html" id="quickView" class="link-pro-course" maKhoaHoc="${khoaHoc.MaKhoaHoc}">Quick View</a>
            </div>
        `;
        break;
    }
    $('.product_price h4').after(noidungKH);
    $('.pro-info-course').html(click);
}

$('body').delegate('.link-pro-course', 'click', function () {
    // loadChiTiet()
    let maKH = $(this).attr('makhoahoc');

    khoaHocService.LayChiTietKhoaHoc(maKH);
});

layDetailCourse();
function layDetailCourse() {
    loadDetailCoure();
    let views = '';
    let code = '';
    let moTa = '';
    views += `
            <span class="star-text">
                There were
            <span class="views--">
                <strong>
                    ${detailCourse.LuotXem}
                </strong>
            </span>
                views
            </span>
            `;

    code += `
                <p class="Ma-course">Mã: ${detailCourse.MaKhoaHoc}</p>
            `;

    moTa += `
                <div class="single_page">${detailCourse.MoTa}</div>
            `;
    $('.detail--title h3').after(code);
    $('.detail-rating span:nth-child(4)').html(views);
    $('#moTa').html(moTa);
}

function ghiDanhKhoaHoc() {
    // getStorage();
    loadDetailCoure();
    let jsonGhiDanh = localStorage.getItem('ThongTinDangNhap');
    if (jsonGhiDanh !== null) {
        let list = JSON.parse(jsonGhiDanh);
        dsNguoiDung.DSND = list;
        khoaHocService.GhiDanhKhoaHoc(detailCourse.MaKhoaHoc, dsNguoiDung.DSND[0].TaiKhoan)
    } else {
        swal({
            type: 'warning',
            title: 'Please register before registring for this course!',
            text: 'Please regis account?',
            animation: false,
            customClass: 'animated tada',
        }).then((willDelete) => {
            window.location.reload();
        });
    }
}

$('.btnGhiDanh').click(function () {
    dsGhiDanh();
    let jsonNgDung = localStorage.getItem('ThongTinDangNhap');
    if (jsonNgDung === null) {
        swal({
            type: 'warning',
            title: 'Please register before registring for this course!',
            text: 'Please regis account?',
            animation: false,
            customClass: 'animated tada',
        }).then((ev) => {
            window.location.reload();
        });
    } else {
        swal({
            type: 'warning',
            title: 'Do You want to regis!',
            text: 'Are you sure you want to regis this Course?',
            animation: false,
            customClass: 'animated tada',
        }).then((willDelete) => {
            if (willDelete) {
                ghiDanhKhoaHoc();
            }
            // window.location.reload();
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

let dsgd = [null];
let thongtinGhiDanh = [null];
function dsGhiDanh() {
    let changeButton = '';
    let jsonGhiDanh = localStorage.getItem('ThongTinDangNhap');
    if (jsonGhiDanh !== null) {
        let listGhiDanh = JSON.parse(jsonGhiDanh);
        thongtinGhiDanh = listGhiDanh;

        khoaHocService.LayThongTinGhiDanhKhoaHoc(thongtinGhiDanh[0].TaiKhoan);
        let ghiDanh = localStorage.getItem('ThongTinGhiDanhKhoaHoc');
        if (ghiDanh !== null) {
            let listGD = JSON.parse(ghiDanh);
            dsgd = listGD;

            for (let i = 0; i < dsgd.length; i++) {
                if (dsgd[i].MaKhoaHoc === detailCourse.MaKhoaHoc) {
                    changeButton += `
                    <p class="register--course">
                        <button id="registerCourse" class="btn btn-success btnRegisterCourse btnGhiDanh waves-effect waves-light">You have registed</button>
                        <button class="js-modal-btn btn btn-primary waves-effect waves-light" id="btnViewDemo" data-video-id="71iYz7kkh4Q">Course Demo</button>
                    </p>
                    `;
                    $('#registerCourse').prop('disabled', true);
                    swal({
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

let detailCourse: any = [null];
function loadDetailCoure() {
    let detail = localStorage.getItem('ChiTietKhoaHoc');
    if (detail === null) {
        // window.location.href = 'course.html';
    }
    let listDetail = JSON.parse(detail);
    detailCourse = listDetail;
}

getKH();
function getKH() {
    let jsonKH = localStorage.getItem('DSKH');
    let listKH = JSON.parse(jsonKH);
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

