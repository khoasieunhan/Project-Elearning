// import { DangKyNDService } from '../Services/NguoiDungService';

// let layThongTinDangNhap = new DangKyNDService();

// layThongTinDangNhap.LayThongTinDangNhap().done(function(data){
//     console.log(data);
// });

export function DSNguoiDungService(){
    this.LayDanhSachNguoiDung = function(){
        return $.ajax({
            type: 'GET',
            url: 'http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung',
            dataType: 'json',
            success: function(data){
                var DSND = JSON.stringify(data);
                localStorage.setItem("DSND", DSND);
            }
        }); 
    }

    this.ThemNguoiDung = function(ngDung){
        return $.ajax({
            type: 'POST',
            dataType: 'json',
            url: `http://sv.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung`,
            data: ngDung
        });
    }

    this.XoaNguoiDung = function(taiKhoan){
        return $.ajax({
            type: 'DELETE',
            dataType: 'json',
            url: `http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${taiKhoan}`,
            async: false
        });
    }

    this.UpdateNguoiDung = function(TaiKhoan, MatKhau, HoTen, Email, SoDT, MaLoaiNguoiDung, TenLoaiNguoiDung){
        var UpdateNgDung = {TaiKhoan:TaiKhoan, MatKhau:MatKhau, Email:Email, HoTen:HoTen, SoDT:SoDT, MaLoaiNguoiDung:MaLoaiNguoiDung, TenLoaiNguoiDung:TenLoaiNguoiDung};
        var ngDung = JSON.stringify(UpdateNgDung);
        return $.ajax({
            type: 'PUT',
            dataType: 'json',
            url: `http://sv.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung`,
            contentType: 'application/json',
            data: ngDung,
            success: function(data){
                setTimeout(function () {
                    hideloader();
                    swal({
                        text: "Cập nhật thành công",
                        icon: "success",
                        button: "OK",
                      }).then((value) =>{
                        window.location.reload();
                    });
                    console.log(ketqua);
                    return true;
                }, 500);
                var jsonData = JSON.stringify(data);
                localStorage.setItem('ngDung', jsonData );
            }
        });
    }
}