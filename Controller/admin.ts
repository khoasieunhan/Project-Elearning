import { KhoaHocService } from '../Services/DSKhoaHocService';
import { DSKhoaHoc } from '../Models/DSKhoaHoc';
//import from 'jquery
import * as $ from 'jquery';
import '../node_modules/mdbootstrap/js/popper.min';
import { KhoaHoc } from '../Models/KhoaHoc';
import { NguoiDung } from '../Models/NgDung';
import { DSNguoiDungService } from '../Services/dsNguoiDungService';
import '../Assets/js/ckeditor';
import { DSNguoiDung } from '../Models/DSNguoiDung';
import { DangKyNDService } from '../Services/NguoiDungService';
// import { checkLogin } from '../Controller/dsKhoaHoc';
// ES6 Modules or TypeScript
import swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { checkLogin, ThongTinCaNhan, getStorage } from './dsKhoaHoc';

// let dkNgDungService = new DangKyNDService();

// dkNgDungService.LayThongTinDangNhap().done();

let dsKhoaHoc = new DSKhoaHoc();

let khoaHocService = new KhoaHocService();

let nguoiDungService = new DSNguoiDungService();

let dsNguoiDung = new DSNguoiDung();

khoaHocService.LayDanhSachKhoaHoc().done(function (DSKH) {
    dsKhoaHoc.DSKH = DSKH;
    LoadDSKhoaHoc(dsKhoaHoc.DSKH);
});

nguoiDungService.LayDanhSachNguoiDung().done(function (DSND) {
    dsNguoiDung.DSND = DSND;
    loadDSNguoiDung(dsNguoiDung.DSND);
    loadTTGiaoVu(DSND);
});

// ThongTinCaNhan(dsNguoiDung.DSND);
// checkLogin(dsNguoiDung.DSND);
// getStorage();

function loadDSNguoiDung(DSND) {
    var noiDungNgDung = "";
    for (let i = 0; i < DSND.length; i++) {
        let ngDung = DSND[i];
        noiDungNgDung += `
            <tr style="line-heght: 57px; text-align: center;">
                <td><input class="ckbMaTK" type="checkbox" value="${ngDung.TaiKhoan}"></td>
                <td>${ngDung.TaiKhoan}</td>
                <td>${ngDung.HoTen}</td>
                <td>${ngDung.Email}</td>
                <td>${ngDung.SoDT}</td>
                <td>${ngDung.MaLoaiNguoiDung}</td>
                <td><button class="btn btn-success btnUpdate" TaiKhoan="${ngDung.TaiKhoan}">EDIT</button></td>
            </tr>
        `;
    }
    $('.infor-table').html(noiDungNgDung);
}

export function LoadDSKhoaHoc(DSKH) {
    var noiDungKhoaHoc = "";
    for (let i = 0; i < DSKH.length; i++) {
        let khoaHoc = DSKH[i];
        noiDungKhoaHoc += `
            <tr style="line-height: 57px; text-align: center;">
                <td><input class="ckbMaKhoaHoc" type="checkbox" value="${khoaHoc.MaKhoaHoc}" /></td>
                <td>${khoaHoc.MaKhoaHoc}</td>
                <td>${khoaHoc.TenKhoaHoc}</td>
                <td>${khoaHoc.NguoiTao}</td>
                <td><img src='${khoaHoc.HinhAnh}' with="75", height="50"></td>
                <td>${khoaHoc.LuotXem}</td>
                <td><button class="btn btn-success btnChinhSua" style="word-break: initial;" MaKhoaHoc="${khoaHoc.MaKhoaHoc}">EDIT</button></td>
            </tr>
        `;
    }
    $('.inform-table').html(noiDungKhoaHoc);
}

CKEDITOR.replace('MoTa');

function loadTTGiaoVu(DSND) {
    let ndNgTao = "";
    for (let i = 0; i < DSND.length; i++) {
        var nd = DSND[i];
        if (nd.MaLoaiNguoiDung === 'GV') {
            ndNgTao += `
            <option value='${nd.TaiKhoan}'>${nd.HoTen}</option>
        `;
        }
    }
    $('.NguoiTao').html(ndNgTao);
}

$('#btn--Add').click(function () {
    var footer = `
    <button class="btn btn-success btnThem" id="btnThemND">Accept</button>
    `;
    $('.modal-footer').html(footer);
    $('#btnModalll').trigger("click");
});

$('#btn-Add-1').click(function () {
    var footer = `
    <button class="btn btn-success btnThem" id="btnThemKH">Accept</button>
    `;
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
    let nd = new NguoiDung();
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
    let kh = new KhoaHoc();
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
    for (let i = 0; i < lstTaiKhoan.length; i++) {
        let chonTaiKhoan = lstTaiKhoan[i];
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
    for (let i = 0; i < lstMaKhoaHoc.length; i++) {
        let chonMaKhoaHoc = lstMaKhoaHoc[i];
        if (chonMaKhoaHoc.checked) {
            khoaHocService.XoaKhoaHoc(chonMaKhoaHoc.value).done(function (data) {
                location.reload();
            }).fail(function (error) {

            });
        }
    }
});

$('body').delegate(".btnUpdate", "click", function () {
    let taikhoan = $(this).attr('taikhoan');
    // Lấy đối tượng ngDung
    let tk = dsNguoiDung.LayThongTinNguoiDung(taikhoan);
    // Load Dữ liệu lên popup
    let title = `Edit User`;
    let fttitle = `
    <button class="btn btn-success btnLuuND" type="button" id="btnLuu">Save</button>
    <button class="btn btn-danger btnClose" type="button"  id="btnHuy">Close</button>
    `;
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
    let MaKH = $(this).attr('makhoahoc');
    // Lấy đối tượng khóa học
    let khoaHoc = dsKhoaHoc.LayThongTinKhoaHoc(MaKH);
    //Load dữ liệu lên popup
    let tieuDe = `Edit Course`;
    let footer = `
        <button class="btn btn-success btnLuu" id="btnLuuKH">Save</button>
        <button class="btn btn-danger btnClose" id="btnHuy">Close</button>
    `;
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
    let TaiKhoan = $('.TaiKhoan').val();
    let MatKhau = $('.MatKhau').val();
    let HoTen = $('.HoTen').val();
    let Email = $('.Email').val();
    let SoDT = $('.soDienThoai').val();
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
    let MaKhoaHoc = $('.MaKH').val();
    let TenKhoaHoc = $('.TenKH').val();
    let LuotXem = $('.LuotXem').val();
    var NguoiTao = $('.NguoiTao').val();
    $('.btnClose').trigger("click");
    $('.MaKH').removeAttr('readonly');
    //Lấy Gía Trị mô tả
    let MoTa = CKEDITOR.instances['MoTa'].getData();
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