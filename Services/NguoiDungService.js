import {
    DSNguoiDung
} from '../Models/DSNguoiDung';

// import {
//     DSNguoiDungService
// } from '../Services/dsNguoiDungService';

// let nguoiDungService = new DSNguoiDungService();

let dsNguoiDung = new DSNguoiDung();

// nguoiDungService.LayDanhSachNguoiDung().done(function (DSND) {
//     dsNguoiDung.DSND = DSND;
// })

export function DangKyNDService() {
    this.DangKyNguoiDung = function (ngDung) {
        showloader();

        return $.ajax({
            url: `http://sv.myclass.vn/api/QuanLyTrungTam/DangKy`,
            type: 'POST',
            dataType: 'json',
            async: false,
            data: ngDung,
            success: function (ketqua) {
                setTimeout(function () {
                    hideloader();
                    swal({
                        type: 'success',
                        title: 'Sign-up success!',
                        text: 'Please, sign-in!',
                        animation: false,
                        customClass: 'animated tada',
                    }).then((value) => {
                        location.href = "index.html";
                    });
                    console.log(ketqua);
                    return true;
                }, 5000);
            },
            error: function (ketqua) {
                setTimeout(function () {
                    hideloader();
                    swal({
                        type: 'error',
                        title: 'Sign-up Error!',
                        text: 'Please, sign-up again!',
                        animation: false,
                        customClass: 'animated tada',
                    }).then((value) => {

                    });
                    console.log(ketqua);
                    return true;
                }, 5000);
            }
            // success: function () {
            //     localStorage.setItem("jsonDKy", jsonDKy);
            // }
        });
    }

    this.LayThongTinDangNhap = function (TaiKhoan, MatKhau) {
        console.log('TaiKhoan', TaiKhoan);
        console.log('MatKhau', MatKhau);
        showloader();
        
        // let jsonLogin = {TaiKhoan: TaiKhoan, MatKhau:MatKhau};
        return $.ajax({
            url: `http://sv.myclass.vn/api/QuanLyTrungTam/DangNhap?taikhoan=${TaiKhoan}&matkhau=${MatKhau}`,
            type: 'GET',
            dataType: 'json',
            success: function (ketqua) {
                // localStorage.setItem('ThongTinDangNhap', jsonUser);
                setTimeout(function () {
                    hideloader();
                    console.log(ketqua);

                    var error = false;
                    if (ketqua === "failed to login") {
                        swal({
                            type: 'error',
                            title: 'Wrong account or password!',
                            text: 'Hello!',
                            animation: false,
                            customClass: 'animated tada',
                        }).then((value) => {
                            window.location.href = "index.html";
                        });
                        error = true;
                        return error;
                    } else {
                        dsNguoiDung.DSND = ketqua;
                        if (dsNguoiDung.DSND[0].MaLoaiNguoiDung === "HV") {
                            swal({
                                type: 'success',
                                title: 'Login success!',
                                text: 'Hello!',
                                animation: false,
                                customClass: 'animated tada',
                            }).then((value) => {
                                window.location.href = "index.html";
                            });
                        } else if(dsNguoiDung.DSND[0].MaLoaiNguoiDung === "GV") {
                            swal({
                                type: 'success',
                                title: 'Login success!',
                                text: 'Hello, Admin!',
                                animation: false,
                                customClass: 'animated tada',
                            }).then((value) => {
                                window.location.href = "admin.html";
                            });
                        }else if(dsNguoiDung.DSND[0].MaLoaiNguoiDung !== "GV") {
                            swal({
                                type: 'error',
                                title: 'You do not have permission to access this page!',
                                text: 'Please, come back!',
                                animation: false,
                                customClass: 'animated tada',
                            }).then((value) => {
                                window.location.href = "index.html";
                            });
                        }else{
                            swal({
                                type: 'success',
                                title: 'Login success!',
                                text: 'Hello!',
                                animation: false,
                                customClass: 'animated tada',
                            }).then((value) => {
                                window.location.href = "index.html";
                            });
                        }

                        var jsonUser = JSON.stringify(ketqua);
                        localStorage.setItem('ThongTinDangNhap', jsonUser);

                        var jsonPass = JSON.stringify(MatKhau);
                        localStorage.setItem('Pass', jsonPass);

                        error = false;
                        return error;
                    }
                }, 500);
            },
        });
    }

    this.LayThongTinNguoiDung = function (taikhoan) {
        return $.ajax({
            url: `http://sv.myclass.vn/api/QuanLyTrungTam/ThongTinNguoiDung?taikhoan=${taikhoan}`,
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function(ketqua)
            {
                //load();
                var jsonHocVien = JSON.stringify(ketqua);
                localStorage.setItem('ThongTinNguoiDung',jsonHocVien);
                console.log(ketqua);
            },
            error:function(error)
            {
                console.log();
            }
        });
    }
}
//Loader 
function showloader() {
    $(".preloader").css("display: inline-block");
}

function hideloader() {
    $(".preloader").hide();
}