export function DSKhoaHoc() {
    this.DSKH = [];

    this.LayThongTinKhoaHoc = function (MaKhoaHoc) {
        for (let i = 0; i < this.DSKH.length; i++) {
            let khoaHoc = this.DSKH[i];
            if (khoaHoc.MaKhoaHoc === MaKhoaHoc) {
                return khoaHoc;
            }
        }
        return null;
    }

    this.ThemKhoaHoc = function (khoahoc) {
        this.DSKH.push(khoahoc);
    }

    this.TimKiemKhoaHoc = function (name) {
        var mangDSKH = new DSKhoaHoc();
        for (let i = 0; i < this.DSKH.length; i++) {
            let value = this.DSKH[i];
            if (value.TenKhoaHoc.toLowerCase().indexOf(name.toLowerCase()) > -1 || value.MaKhoaHoc.toLowerCase().indexOf(name.toLowerCase()) > -1) {
                mangDSKH.ThemKhoaHoc(value);
            }
        }
        return mangDSKH;
    }

    this.TimKiemKhoaHoc2 = function (name) {
        var mangDSKH = new DSKhoaHoc();
        for (let i = 0; i < this.DSKH.length; i++) {
            let value = this.DSKH[i];
            if (value.TenKhoaHoc.toLowerCase().indexOf(name.toLowerCase()) > -1 || value.MaKhoaHoc.toLowerCase().indexOf(name.toLowerCase()) > -1) {
                mangDSKH.ThemKhoaHoc(value);
                if (name == "") {
                    var mangTrong = [];
                    return mangTrong;
                }
            }
        }
        return mangDSKH;
    }

    this.layThongTinKhoaHoc = function (id) {
        for (let i = 0; i < this.DSKH.length; i++) {
            var value = this.DSKH[i];
            if (value.MaKhoaHoc == id) {
                return value;
            }
        }
    }

    this.CapNhatThongTinKhoaHoc = function (mangKhoaHocUpdate) {
        for (let i = 0; i < this.DSKH.length; i++) {
            let value = this.DSKH[i];
            if (mangKhoaHocUpdate.MaKhoaHoc == value.MaKhoaHoc) {
                value.TenKhoaHoc = mangKhoaHocUpdate.TenKhoaHoc;
                value.MoTa = mangKhoaHocUpdate.MoTa;
                value.HinhAnh = mangKhoaHocUpdate.HinhAnh;
                value.LuotXem = mangKhoaHocUpdate.LuotXem;
            }
        }
    }

    this.XoaKhoaHoc = function (mangXoaKhoaHoc) {

        for (let i = 0; i < mangXoaKhoaHoc.length; i++) {
            for (let j = 0; j < this.DSKH.length; j++) {
                var mangXoaKH = mangXoaKhoaHoc[i];
                if (mangXoaKH == this.DSKH[j].MaKhoaHoc) {
                    this.mangKhoaHoc.splice(j, 1);
                }
            }
        }
    }
}