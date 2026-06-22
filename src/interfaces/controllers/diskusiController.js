import * as DiskusiUseCase from "../../usecases/diskusiUseCase.js";

export const getByMateri = async (req, res) => {
  try {
    const data = await DiskusiUseCase.getDiskusiByMateri(
      req.params.materiId
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const create = async (req, res) => {
  try {
    await DiskusiUseCase.createDiskusi(
      req.body.materiId,
      req.user.id,          // ✅ JWT
      req.body.isi_pesan,
      req.body.parent_id || null
    );

    res.json({ message: "Komentar ditambahkan" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    await DiskusiUseCase.updateDiskusi(
      req.params.id,
      req.user.id,          // ✅ JWT
      req.body.isi_pesan
    );

    res.json({ message: "Komentar diperbarui" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    await DiskusiUseCase.deleteDiskusi(
      req.params.id,
      req.user.id
    );

    res.json({ message: "Komentar dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
