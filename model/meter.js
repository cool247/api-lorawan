function MeterModel(
  id = null,
  href = null,
  serialNumber = null,
  manufacturer = null,
  meterType = null
) {
  // let meterData= {}
  this.id = id;
  this.href = href;
  this.serialNumber = serialNumber;
  this.manufacturer = manufacturer;
  this.meterType = meterType;
  this.currentInstallation.id = id;
  this.currentInstallation.href = href;
}

module.exports = MeterModel;
//const errors = user.validate(obj);
