"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DSKhoaHocService_1 = require("../Services/DSKhoaHocService");
var DSKhoaHoc_1 = require("../Models/DSKhoaHoc");
//import from 'jquery
var $ = require("jquery");
require("../node_modules/mdbootstrap/js/popper.min");
var KhoaHoc_1 = require("../Models/KhoaHoc");
var NgDung_1 = require("../Models/NgDung");
var dsNguoiDungService_1 = require("../Services/dsNguoiDungService");
require("../Assets/js/ckeditor");
var DSNguoiDung_1 = require("../Models/DSNguoiDung");
var NguoiDungService_1 = require("../Services/NguoiDungService");
require("sweetalert2/src/sweetalert2.scss");
var dkNgDungService = new NguoiDungService_1.DangKyNDService();
dkNgDungService.LayThongTinDangNhap().done(function (DSND) {
    console.log(DSND);
});
var dsKhoaHoc = new DSKhoaHoc_1.DSKhoaHoc();
var khoaHocService = new DSKhoaHocService_1.KhoaHocService();
var nguoiDungService = new dsNguoiDungService_1.DSNguoiDungService();
var dsNguoiDung = new DSNguoiDung_1.DSNguoiDung();
khoaHocService.LayDanhSachKhoaHoc().done(function (DSKH) {
    dsKhoaHoc.DSKH = DSKH;
    LoadDSKhoaHoc(dsKhoaHoc.DSKH);
});
nguoiDungService.LayDanhSachNguoiDung().done(function (DSND) {
    dsNguoiDung.DSND = DSND;
    loadDSNguoiDung(dsNguoiDung.DSND);
    loadTTGiaoVu(DSND);
});
// checkLogin();
function loadDSNguoiDung(DSND) {
    var noiDungNgDung = "";
    for (var i = 0; i < DSND.length; i++) {
        var ngDung = DSND[i];
        noiDungNgDung += "\n            <tr style=\"line-heght: 57px; text-align: center;\">\n                <td><input class=\"ckbMaTK\" type=\"checkbox\" value=\"" + ngDung.TaiKhoan + "\"></td>\n                <td>" + ngDung.TaiKhoan + "</td>\n                <td>" + ngDung.HoTen + "</td>\n                <td>" + ngDung.Email + "</td>\n                <td>" + ngDung.SoDT + "</td>\n                <td>" + ngDung.MaLoaiNguoiDung + "</td>\n                <td><button class=\"btn btn-success btnUpdate\" TaiKhoan=\"" + ngDung.TaiKhoan + "\">EDIT</button></td>\n            </tr>\n        ";
    }
    $('.infor-table').html(noiDungNgDung);
}
function LoadDSKhoaHoc(DSKH) {
    var noiDungKhoaHoc = "";
    for (var i = 0; i < DSKH.length; i++) {
        var khoaHoc = DSKH[i];
        noiDungKhoaHoc += "\n            <tr style=\"line-height: 57px; text-align: center;\">\n                <td><input class=\"ckbMaKhoaHoc\" type=\"checkbox\" value=\"" + khoaHoc.MaKhoaHoc + "\" /></td>\n                <td>" + khoaHoc.MaKhoaHoc + "</td>\n                <td>" + khoaHoc.TenKhoaHoc + "</td>\n                <td>" + khoaHoc.NguoiTao + "</td>\n                <td><img src='" + khoaHoc.HinhAnh + "' with=\"75\", height=\"50\"></td>\n                <td>" + khoaHoc.LuotXem + "</td>\n                <td><button class=\"btn btn-success btnChinhSua\" style=\"word-break: initial;\" MaKhoaHoc=\"" + khoaHoc.MaKhoaHoc + "\">EDIT</button></td>\n            </tr>\n        ";
    }
    $('.inform-table').html(noiDungKhoaHoc);
}
exports.LoadDSKhoaHoc = LoadDSKhoaHoc;
CKEDITOR.replace('MoTa');
function loadTTGiaoVu(DSND) {
    var ndNgTao = "";
    for (var i = 0; i < DSND.length; i++) {
        var nd = DSND[i];
        if (nd.MaLoaiNguoiDung === 'GV') {
            ndNgTao += "\n            <option value='" + nd.TaiKhoan + "'>" + nd.HoTen + "</option>\n        ";
        }
    }
    $('.NguoiTao').html(ndNgTao);
}
$('#btn--Add').click(function () {
    var footer = "\n    <button class=\"btn btn-success btnThem\" id=\"btnThemND\">Accept</button>\n    ";
    $('.modal-footer').html(footer);
    $('#btnModalll').trigger("click");
});
$('#btn-Add-1').click(function () {
    var footer = "\n    <button class=\"btn btn-success btnThem\" id=\"btnThemKH\">Accept</button>\n    ";
    $('.modal-footer').html(footer);
    $('#btnModall').trigger("click");
});
$('body').delegate('#btnThemND', 'click', function () {
    var TaiKhoan = $('.TaiKhoan').val();
    var MatKhau = $('.MatKhau').val();
    var HoTen = $('.HoTen').val();
    var Email = $('.Email').val();
    //Lấy giá trị mô tả
    var SoDT = $('.soDienThoai').val();
    // Gán Thông Tin Người dùng
    var nd = new NgDung_1.NguoiDung();
    nd.TaiKhoan = TaiKhoan;
    nd.MatKhau = MatKhau;
    nd.HoTen = HoTen;
    nd.Email = Email;
    nd.SoDT = SoDT;
    nd.MaLoaiNguoiDung = "HV";
    nguoiDungService.ThemNguoiDung(nd).done(function (data) {
        console.log(data);
        // location.reload();
    }).fail(function (error) {
    });
});
$('body').delegate('#btnThemKH', 'click', function () {
    var MaKhoaHoc = $('.MaKH').val();
    var TenKhoaHoc = $('.TenKH').val();
    var LuotXem = $('.LuotXem').val();
    var NguoiTao = $('.NguoiTao').val();
    //Lấy giá trị mô tả
    var MoTa = CKEDITOR.instances["MoTa"].getData();
    // Gán Thông Tin Người dùng
    var kh = new KhoaHoc_1.KhoaHoc();
    kh.MaKhoaHoc = MaKhoaHoc;
    kh.TenKhoaHoc = TenKhoaHoc;
    kh.LuotXem = LuotXem;
    kh.NguoiTao = NguoiTao;
    kh.MoTa = MoTa;
    console.log(kh);
    khoaHocService.ThemKhoaHoc(kh).done(function (data) {
        location.reload();
    }).fail(function (error) {
    });
});
$('.btn--remove').click(function () {
    var lstTaiKhoan = $('.ckbMaTK');
    for (var i = 0; i < lstTaiKhoan.length; i++) {
        var chonTaiKhoan = lstTaiKhoan[i];
        if (chonTaiKhoan.checked) {
            nguoiDungService.XoaNguoiDung(chonTaiKhoan.value).done(function (data) {
                location.reload();
            }).fail(function (error) {
            });
        }
    }
});
$('.btn--remove-1').click(function () {
    var lstMaKhoaHoc = $('.ckbMaKhoaHoc');
    for (var i = 0; i < lstMaKhoaHoc.length; i++) {
        var chonMaKhoaHoc = lstMaKhoaHoc[i];
        if (chonMaKhoaHoc.checked) {
            khoaHocService.XoaKhoaHoc(chonMaKhoaHoc.value).done(function (data) {
                location.reload();
            }).fail(function (error) {
            });
        }
    }
});
$('body').delegate(".btnUpdate", "click", function () {
    var taikhoan = $(this).attr('taikhoan');
    // Lấy đối tượng ngDung
    var tk = dsNguoiDung.LayThongTinNguoiDung(taikhoan);
    // Load Dữ liệu lên popup
    var title = "Edit User";
    var fttitle = "\n    <button class=\"btn btn-success btnLuuND\" type=\"button\" id=\"btnLuu\">Save</button>\n    <button class=\"btn btn-danger btnClose\" type=\"button\"  id=\"btnHuy\">Close</button>\n    ";
    $('.modal-title').html(title);
    $('.modal-footer').html(fttitle);
    $('#btnModalll').trigger("click");
    $('.TaiKhoan').val(tk.TaiKhoan);
    $('.TaiKhoan').attr('readonly', true);
    $('.MatKhau').attr(tk.MatKhau);
    $('.HoTen').val(tk.HoTen);
    $('.Email').val(tk.Email);
    $('.soDienThoai').val(tk.SoDT);
});
$('body').delegate(".btnChinhSua", "click", function () {
    var MaKH = $(this).attr('makhoahoc');
    // Lấy đối tượng khóa học
    var khoaHoc = dsKhoaHoc.LayThongTinKhoaHoc(MaKH);
    //Load dữ liệu lên popup
    var tieuDe = "Edit Course";
    var footer = "\n        <button class=\"btn btn-success btnLuu\" id=\"btnLuuKH\">Save</button>\n        <button class=\"btn btn-danger btnClose\" id=\"btnHuy\">Close</button>\n    ";
    $('.modal-title').html(tieuDe);
    $('.modal-footer').html(footer);
    $('#btnModall').trigger("click");
    $('.MaKH').val(khoaHoc.MaKhoaHoc);
    $('.MaKH').attr('readonly', true);
    $('.TenKH').val(khoaHoc.TenKhoaHoc);
    CKEDITOR.instances['MoTa'].setData(khoaHoc.MoTa);
    $('.LuotXem').val(khoaHoc.LuotXem);
    $('.NguoiTao').val(khoaHoc.NguoiTao);
});
$('body').delegate('.btnLuuND', 'click', function () {
    // Lấy thông tin từ popup
    var TaiKhoan = $('.TaiKhoan').val();
    var MatKhau = $('.MatKhau').val();
    var HoTen = $('.HoTen').val();
    var Email = $('.Email').val();
    var SoDT = $('.soDienThoai').val();
    $('.btnClose').trigger("click");
    $('.TaiKhoan').removeAttr('readonly');
    // Gọi server gửi data về back-end
    nguoiDungService.UpdateNguoiDung(TaiKhoan, MatKhau, HoTen, Email, SoDT).done(function (data) {
        location.reload();
        return;
        // location.reload();
    }).fail(function (error) {
    });
    // location.reload();
});
$('body').delegate('#btnLuuKH', 'click', function () {
    //Lấy Thông tin từ popup
    var MaKhoaHoc = $('.MaKH').val();
    var TenKhoaHoc = $('.TenKH').val();
    var LuotXem = $('.LuotXem').val();
    var NguoiTao = $('.NguoiTao').val();
    $('.btnClose').trigger("click");
    $('.MaKH').removeAttr('readonly');
    //Lấy Gía Trị mô tả
    var MoTa = CKEDITOR.instances['MoTa'].getData();
    //Gọi Server gửi data về back-End
    khoaHocService.CapNhatKhoaHoc(MaKhoaHoc, TenKhoaHoc, MoTa, LuotXem, NguoiTao).done(function (data) {
        location.reload();
    }).fail(function (error) {
    });
    // location.reload();   
});
// Lấy Storage DSKH
function LayStorageKH() {
    if (localStorage.getItem("DSKH")) {
        // Lấy chuỗi dsnd
        var chuoiDSKH = localStorage.getItem("DSKH");
        // Chuyển chuỗi thành mảng rồi gán vào mảng đối tượng
        dsKhoaHoc.DSKH = JSON.parse(chuoiDSKH);
        // load lại datatable
        LoadDSKhoaHoc(dsKhoaHoc.DSKH);
    }
}
LayStorageKH();
// Lấy Storage DSKH
function LayStorageND() {
    if (localStorage.getItem("DSND")) {
        // Lấy chuỗi dsnd
        var chuoiDSND = localStorage.getItem("DSND");
        // Chuyển chuỗi thành mảng rồi gán vào mảng đối tượng
        dsNguoiDung.DSND = JSON.parse(chuoiDSND);
        // load lại datatable
        loadDSNguoiDung(dsNguoiDung.DSND);
    }
}
LayStorageND();
