import "@stdlib/deploy";

struct Row {
  value: Address;
  valid_until: Int as uint64;
}

message(0x1) SetMessage {
  query_id: Int as uint64;
  key: Int as uint256;
  valid_until: Int as uint64;
  value: Int as remaining; // should be reminder of the slice  as remaining;
}

message(0x2) DeleteExpired {
  query_id: Int as uint64;
}

contract StorageContract with Deployable {
  seed: Int;
  dict: map[Int]Row;

  init(seed: Int) {
    self.seed = seed;
  }

  receive(msg: SetMessage) {
    let ctx: Context = context();

    self.dict.set(msg.key, Row{
      value: msg.value,
      valid_until: msg.valid_until
    });
  }

  receive(msg: DeleteExpired) {
    // @q: iterate?
    //  self.dict.set(msg.key, null);
  //   int key = -1;
	// do {
	// 	(key, slice cs, int f) = dic.udict_get_next?(256, key);

	// } until (~ f);
  }

  receive(msg: Slice) {
    throw(0xffff);
  }

  get fun row(key: Int): Row {
    let row: Row? = self.dict.get(key);

    require(row != null, "OOPS null");

    return row!!;
  }
}
