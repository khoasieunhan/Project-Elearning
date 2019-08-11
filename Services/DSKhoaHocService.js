// function load() {
//     (function () {
//         if (window.localStorage) {
//             if (!localStorage.getItem('firstLoad')) {
//                 localStorage['firstLoad'] = true;
//                 window.location.reload();
//             } else
//                 localStorage.removeItem('firstLoad');
//         }
//     })();
// }

export function KhoaHocService() {
    this.LayDanhSachKhoaHoc = function () {
        return $.ajax({
            type: "GET",
            url: "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc",
            dataType: "json",
            async: false,
            success: function (data) {
                var DSKH = JSON.stringify(data);
                localStorage.setItem("DSKH", DSKH);
            }
        });
    }

    this.LayChiTietKhoaHoc = function (maKH) {
        return $.ajax({
            type: 'GET',
            url: `http://sv.myclass.vn/api/QuanLyTrungTam/ChiTietKhoaHoc/${maKH}`,
            dataType: 'json',
            async: false,
            success: function (data) {
                let ChiTietKhoaHoc = JSON.stringify(data);
                localStorage.setItem("ChiTietKhoaHoc", ChiTietKhoaHoc);
            }
        });
    }

    this.ThemKhoaHoc = function (khoahoc) {
        return $.ajax({
            type: 'POST',
            url: `http://sv.myclass.vn/api/QuanLyTrungTam/ThemKhoaHoc`,
            dataType: 'json',
            data: khoahoc,
            success: function (ketqua) {
                setTimeout(function () {
                    hideloader();
                    swal({
                        text: "Add course success!",
                        icon: "success",
                        button: "OK",
                    }).then((value) => {
                        window.location.reload();
                    });
                    console.log(ketqua);
                    return true;
                }, 500);

            },
            error: function (ketqua) {
                setTimeout(function () {
                    hideloader();
                    swal({
                        text: "Course code is identical!",
                        icon: "error",
                        button: "OK",
                    }).then((value) => {

                    });
                }, 500);

            }
        });
    }

    this.CapNhatKhoaHoc = function (MaKhoaHoc, TenKhoaHoc, MoTa, LuotXem, NguoiTao) {
        var KhoaHoc = {
            MaKhoaHoc: MaKhoaHoc,
            TenKhoaHoc: TenKhoaHoc,
            MoTa: MoTa,
            LuotXem: LuotXem,
            NguoiTao: NguoiTao
        };
        var jsondata = JSON.stringify(KhoaHoc);
        return $.ajax({
            url: `http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatKhoaHoc`,
            type: 'PUT',
            contentType: 'application/json',
            dataType: 'json',
            data: jsondata,
            async: false,
            success: function (ketqua) {
                setTimeout(function () {
                    // hideloader();
                    swal({
                        text: "Cập nhật khóa học thành công!",
                        icon: "success",
                        button: "OK",
                    }).then((value) => {
                        window.location.reload();
                    });
                    console.log(ketqua);
                    return true;
                }, 500);

            },
            error: function (ketqua) {
                setTimeout(function () {
                    swal({
                        text: "Cập nhật khóa học thành công!",
                        icon: "success",
                        button: "OK",
                    }).then((value) => {
                        window.location.reload();
                    });
                }, 500);

            }
            // success: function(){
            //     localStorage.setItem('jsondata', jsondata);
            // }
        });
    }

    this.GhiDanhKhoaHoc = function (maKH, taiKhoan) {
        console.log('MaKhoaHoc', maKH);
        console.log('TaiKhoan', taiKhoan);
        var ghiDanhKH = {
            MaKhoaHoc: maKH,
            TaiKhoan: taiKhoan
        };
        var jsondata = JSON.stringify(ghiDanhKH);
        return $.ajax({
            url: `http://sv.myclass.vn/api/QuanLyTrungTam/GhiDanhKhoaHoc`,
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: jsondata,
            success: function (ketqua) {
                setTimeout(function () {
                    // hideloader();
                    swal({
                        text: "Registed course success!",
                        icon: "success",
                        button: "OK",
                    }).then((value) => {
                        // load();
                        window.location.reload();
                    });
                    console.log(ketqua);
                }, 1000);
                localStorage.setItem('mangDSGD', jsondata);
            },
            error: function (ketqua) {

            }

        });
    }

    this.XoaKhoaHoc = function (maKH) {
        return $.ajax({
            url: `http://sv.myclass.vn/api/QuanLyTrungTam/XoaKhoaHoc/${maKH}`,
            type: 'DELETE',
            dataType: 'json',
            async: false,
            success: function (ketqua) {
                swal({
                    text: "Delete course success!",
                    icon: "success",
                    button: "OK",
                }).then((value) => {
                    window.location.reload();
                });
                console.log(ketqua);

            },
            error: function (ketqua) {
                swal({
                    text: "Registered course can not be deleted!",
                    icon: "success",
                    button: "OK",
                })
            }
        });
    }

    this.LayThongTinGhiDanhKhoaHoc = function (taikhoan) {
        console.log('TaiKhoan', taikhoan);
        return $.ajax({
            url: `http://sv.myclass.vn/api/QuanLyTrungTam/LayThongTinKhoaHoc?taikhoan=${taikhoan}`,
            type: 'GET',
            dataType: 'json',
            async: false,
            success: function (ketqua) {
                var jsonGhiDanh = JSON.stringify(ketqua);
                localStorage.setItem("ThongTinGhiDanhKhoaHoc", jsonGhiDanh);
                console.log(ketqua);
            },
            error: function (error) {
                console.log();
            }
    
        });
    }
}