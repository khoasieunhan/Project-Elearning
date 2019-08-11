export function DSNguoiDung() {
    this.DSND = [];

    this.ThemNguoiDung = function (ngDung) {
        this.DSND.push(ngDung);
    }

    this.LayThongTinNguoiDung = function (ngDung) {
        for (let i = 0; i < this.DSND.length; i++) {
            let TKNgDung = this.DSND[i];
            if (TKNgDung.TaiKhoan === ngDung) {
                return TKNgDung;
            }
        }
        return null;
    }

    this.CapNhatThongTinNguoiDung = function(nguoiDung){
        for(var i=0; i<this.DSND.length; i++){
            var nguoiDungUpdate = this.DSND[i];
            // lấy giá trị từ người dùng đã chỉnh sửa cập nhật cho người dùng trong mảng DSNV
            if(nguoiDung.TaiKhoan === nguoiDungUpdate.TaiKhoan){
                // Gắn mới các giá trị của người dùng chỉnh sửa
                nguoiDungUpdate.TaiKhoan = nguoiDung.TaiKhoan;
                nguoiDungUpdate.MatKhau = nguoiDung.MatKhau;
                nguoiDungUpdate.HoTen = nguoiDung.HoTen;
                nguoiDungUpdate.Email = nguoiDung.Email;
                nguoiDungUpdate.SoDT = nguoiDung.SoDT;
                nguoiDungUpdate.MaLoaiNguoiDung = nguoiDung.MaLoaiNguoiDung;
            }
        }
    }

}