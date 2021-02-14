pragma solidity >=0.4.21 <0.7.0;

contract SimpleVIN {
    
  struct Report{
    string vin;  
    string brand;
    string model;
    string immatDate;
  }
  
  struct EventStruct{
    Report report;  
    string date;
    string mileage;
    string typeOfEvent;
    string description;
    bytes32 previousTxHash;
  }
  
  Report public report;
  EventStruct eventObj;
  
  function createReport(string memory _vin, string memory _brand, string memory _model, string memory _immatDate) public {
    report = Report(_vin, _brand, _model, _immatDate);
    
  }
  
  function addEvent(string memory _vin, string memory _brand, string memory _model, string memory _immatDate, bytes32 _previousTxHash, string memory _date, string memory _mileage, string memory _typeOfEvent, string memory _description) public {
    report = Report(_vin, _brand, _model, _immatDate);
    eventObj = EventStruct(report, _date, _mileage, _typeOfEvent, _description, _previousTxHash);
  }
}
