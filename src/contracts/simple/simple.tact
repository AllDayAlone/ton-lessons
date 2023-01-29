import "@stdlib/deploy";

contract SimpleContract {
    total: Int as uint64;

    init(initTotal: Int) {
      self.total = initTotal;
    }

    receive(msg: Slice) {
      // throw_if(35,in_msg_body.slice_bits() < 32);
      // @q: how to throw
      // nativeThrowWhen(35, msg.bits() < 32); 

      let amount: Int = msg.loadUint(32);

      self.total = self.total + amount;
    }

    get fun getTotal(): Int {
      return self.total;
    }
}
