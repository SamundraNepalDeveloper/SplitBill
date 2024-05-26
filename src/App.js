import { useState } from "react";

const imageSrc =
  "https://i.pinimg.com/736x/c9/4a/b5/c94ab561bca909037f774e7cd7a3c2c3.jpg";

export default function App() {
  const [InitailFrnName, SetinitailfrnName] = useState([]);
  const [Addfrn, SetAddfrn] = useState(0);
  const [SplitBills, SetSplitBill] = useState(0);
  const [selectFrn, SetSelectedFrn] = useState("");

  const [BillAmount, SetBillAmount] = useState(null);
  const [YourExpenses, SetYourExpenses] = useState(null);

  const [You, setYou] = useState("You");
  let Bill = 0;

  function HandlBillSplit(friend) {
    if (You === "You") {
      Bill = BillAmount - YourExpenses;
    } else {
      Bill = BillAmount - YourExpenses - BillAmount;
    }

    SetinitailfrnName((i) =>
      i.map((I) => (I.id === friend ? { ...I, balance: Bill } : I))
    );
  }

  function HandleFrnSelected(friend) {
    SetSelectedFrn(friend);
  }

  function HandleAddfriend() {
    if (Addfrn === 0 ? SetAddfrn(1) : SetAddfrn(0));
  }

  function HandleSplitBillS(Id) {
    if (SplitBills === 0 ? SetSplitBill(1) : SetSplitBill(0));
  }

  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        SPLIT 💸 BILLS
      </h1>
      <div className="APP_div">
        <FriendList
          iniName={InitailFrnName}
          HandleAddfriend={HandleAddfriend}
          addfrnCondition={Addfrn}
          splitBillFunction={HandleSplitBillS}
          SplitBill={SplitBills}
          HandleFrnSelected={HandleFrnSelected}
          HandlBillSplit={HandlBillSplit}
          BillAmount={BillAmount}
          YourExpenses={YourExpenses}
        />
        {SplitBills === 0 ? (
          ""
        ) : (
          <SplitBill
            iniNames={InitailFrnName}
            selectFrnName={selectFrn}
            BillAmount={BillAmount}
            SetBillAmount={SetBillAmount}
            YourExpenses={YourExpenses}
            SetYourExpenses={SetYourExpenses}
            Bill={Bill}
            setYou={setYou}
            HandlBillSplit={HandlBillSplit}
            You={You}
          />
        )}
        <CreateNewFriends
          setinitialname={SetinitailfrnName}
          iniNames={InitailFrnName}
          addfrncondition={Addfrn}
          SetaddfrnCondition={SetAddfrn}
        />
      </div>
    </div>
  );
}

function CreateNewFriends({
  setinitialname,
  iniNames,
  addfrncondition,
  SetaddfrnCondition,
}) {
  const [Name, SetfrnName] = useState("");
  const [Images, setimage] = useState(imageSrc);

  if (addfrncondition === 0) return;

  function HandleAddfrnList(e) {
    e.preventDefault();
    if (!Name) return;
    const newFriend = { Name, Images, balance: 0, id: Date.now() }; // Creating a new friend object
    setinitialname([...iniNames, newFriend]); // Updating the list of names and images
    SetfrnName("");
    SetaddfrnCondition(0);
  }

  return (
    <form onSubmit={HandleAddfrnList} value="">
      <div className="CNF_parent">
        <div className="CNF_div">
          <label>👫Friend Name : </label>
          <input
            type="text"
            value={Name}
            onChange={(e) => SetfrnName(e.target.value)}
          />
          <label>📷Image Source : </label>
          <input type="text" value={Images}></input>

          <button>ADD</button>
        </div>
      </div>
    </form>
  );
}

function FriendList({
  iniName,
  HandleAddfriend,
  addfrnCondition,
  splitBillFunction,
  SplitBill,
  HandleFrnSelected,
  HandlBillSplit,
  BillAmount,
  YourExpenses,
}) {
  return (
    <div className="FRN_list_Parent_div">
      <ul>
        {iniName.map((item) => (
          <FrnListData
            key={item.id}
            frndata={item}
            splitbillUI={splitBillFunction}
            SplitBill={SplitBill}
            HandleFrnSelected={HandleFrnSelected}
            HandlBillSplit={HandlBillSplit}
            YourExpenses={YourExpenses}
          />
        ))}
      </ul>
      <button
        hidden={addfrnCondition === 0 ? "hidden" : " "}
        className={addfrnCondition === 0 ? "addbtn" : ""}
        onClick={HandleAddfriend}
      >
        Add Friend
      </button>
    </div>
  );
}

function SplitBill({
  selectFrnName,
  BillAmount,
  SetBillAmount,
  YourExpenses,
  SetYourExpenses,
  setYou,
  HandlBillSplit,
  You,
}) {
  return (
    <div className="splitbill_container">
      <div className="splitbill_parent_div">
        <h1>SPLIT BILL WITH {selectFrnName.Name}</h1>
        <div className="splitbill_div">
          <div className="expenses_div">
            <label>💰 Bill Value</label>
            <input
              type="number"
              value={BillAmount}
              onChange={(e) => SetBillAmount(e.target.value)}
            />

            <label>🧑 Your Expenses</label>
            <input
              type="number"
              value={YourExpenses}
              onChange={(e) => SetYourExpenses(e.target.value)}
            />

            <label>🧍{selectFrnName.Name} Expenses</label>
            <input
              style={{ backgroundColor: "#D3D3D3" }}
              type="number"
              value={BillAmount - YourExpenses}
            />

            <label>🤑 Who is Paying the bill?</label>
            <select value={You} onChange={(e) => setYou(e.target.value)}>
              <option value="You">You</option>;
              <option value={selectFrnName.Name}> {selectFrnName.Name}</option>
            </select>

            <button onClick={() => HandlBillSplit(selectFrnName.id)}>
              Split Bill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FrnListData({ frndata, splitbillUI, SplitBill, HandleFrnSelected }) {
  return (
    <li className="frnlist">
      <img
        className="imagecircle"
        src={frndata.Images}
        alt="ProfilePic"
        width="80px"
        height="80px"
      />
      <div>
        <p style={{ fontFamily: "fantasy" }}> {frndata.Name}</p>
        <p style={frndata.balance < 0 ? { color: "red" } : { color: "green" }}>
          {frndata.balance === 0
            ? "Calculate the bills"
            : frndata.balance < 0
            ? ` You owe  ${frndata.Name}  ${frndata.balance}$`
            : `${frndata.Name} owes you ${frndata.balance}$`}
        </p>
      </div>
      <button
        className="btn"
        onClick={() => {
          splitbillUI(frndata);
          HandleFrnSelected(frndata);
        }}
      >
        {SplitBill === 1 ? "Close" : "Select"}
      </button>
    </li>
  );
}
