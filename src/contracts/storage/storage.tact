import "@stdlib/ownable";
import "@stdlib/deploy";

message(0x1) SetAddress {
  query_id: Int;
  address: Address;
}

message(0x2) RequestInfo {
  query_id: Int;
}

message (0x3) ResponseInfo {
  op: Int;
  query_id: Int;
  owner: Address;
  address: Address;
}

contract StorageContract with Deployable, Ownable {
  owner: Address;
  address: Address;

  init(owner: Address, addr_none: Address) {
    self.owner = owner;
    self.address = addr_none;
  }

  receive(msg: SetAddress) {
    self.requireOwner();
    self.address = msg.address;
  }

  receive(msg: RequestInfo) {
    let ctx: Context = context();
    let body: Cell = ResponseInfo{
      op: 0x3,
      query_id: msg.query_id,
      owner: self.owner,
      address: self.address
    }.toCell();

    send(SendParameters{
      to: ctx.sender,
      value: 0, 
      mode: SendRemainingValue + SendIgnoreErrors, 
      bounce: true, 
      // body: body
      body: self.address.asSlice().asString().asComment()  // test!
    });
  }

  // Extra for debug
  get fun address(): Address {
    return self.address;
  }
}
