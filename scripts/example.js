function createBuyRate(val1,opening) {
    var decimalVal = val1/10000
    var buyRate = opening + decimalVal;
    console.log(buyRate);
    return buyRate;              
}

function createBuySL(buyRate,val2) {
    var decimalVal = val2/10000
    var buyStopLoss = buyRate - decimalVal;
    console.log(buyStopLoss);
    return buyStopLoss;              
}

function createBuyTP(buyRate,val3) {
    var decimalVal = val3/10000
    var buyTopProfit = buyRate + decimalVal;
    console.log(buyTopProfit);
    return buyTopProfit;              
}

function createSellRate(val1,opening) {
    var decimalVal = val1/10000
    var sellRate = opening - decimalVal;
    console.log(sellRate);
    return sellRate;              
}

function createSellSL(sellRate,val2) {
    var decimalVal = val2/10000
    var sellStopLoss = sellRate + decimalVal;
    console.log(sellStopLoss);
    return sellStopLoss;              
}

function createSellTP(sellRate,val3) {
    var decimalVal = val3/10000
    var sellTopProfit = sellRate - decimalVal;
    console.log(sellTopProfit);
    return sellTopProfit;              
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var Calculator = 
            React.createClass({
              getInitialState:function(){
                return {
                    inputValues:{
                      value1: 0,
                      value2: 0,
                      value3: 0,
                      opening: 0
                    },
                    outputValues:{
                      buyRate: 0,
                      sellRate: 0,
                      buyStopLoss: 0,
                      buyTopProfit: 0,
                      sellStopLoss: 0,
                      sellTopProfit: 0,
                    },
                    inputsCalculated: false
                }
            },
            calculateOutputValues: function(){
              var buyRate = createBuyRate(this.state.inputValues.value1,this.state.inputValues.opening);
              var buyStopLoss = createBuySL(buyRate,this.state.inputValues.value2);
              var buyTopProfit = createBuyTP(buyRate,this.state.inputValues.value3);
              var sellRate = createSellRate(this.state.inputValues.value1,this.state.inputValues.opening);
              var sellStopLoss = createSellSL(sellRate,this.state.inputValues.value2);
              var sellTopProfit = createSellTP(sellRate,this.state.inputValues.value3);

              this.setState({outputValues: {buyRate,buyStopLoss,buyTopProfit,sellRate,sellStopLoss,sellTopProfit}});
              this.setState({inputsCalculated:true},this.printState);
            },
            update: function(update){
              console.log("Calculator update was called");
                this.setState(
                  update
                );
            },
            calculate: function(value1,value2,value3,opening){
              console.log("calculate was called");
              var newInput = {value1,value2,value3,opening};
              this.printState();
              this.setState({inputValues:newInput},this.calculateOutputValues);
            },
            printState: function(){
              console.log("New calculator state AFTER update");
              console.log(this.state);
            }, 
            render: function () {
              return (
                <div>
                  <div className="grid">
                    <div className="col fluid">
                      <Input values={this.state.inputValues} calculateInputs={this.calculate} value1={this.state.value1} value2={this.state.value2} value3={this.state.value3} opening={this.state.opening}/>
                    </div>
                    <div className="col fluid">
                      <h2>Output</h2>
                      <Output values={this.state.outputValues} inputsHaveBeenCalc={this.state.inputsCalculated} />
                    </div>
                  </div>
                </div>
              );
            }
});


var Input = 
        React.createClass({
           getInitialState:function(){
              return{
                value1 : "",
                value2 : "",
                value3 : "",
                opening : ""
              }

           },
           update: function(key,value){
              console.log("Input Update was Called");
              var newState = {};
              newState[key]= value;
              console.log("New state and old state BEFORE update");
              console.log(newState);
              console.log(this.state);
              this.setState(newState,this.printState);
              
            },
            printState: function()
            {
              console.log("New input state AFTER update");
              console.log(this.state);
            },
            returnInputValues: function()
            {
              if (this.state.value1==="0" || this.state.value2==="0" || this.state.value3==="0" || this.state.opening==="0") {
                alert("Warning you entered a zero value, the calculation will continue!");
              }
              if (this.state.value1.length===0 || this.state.value2.length===0 || this.state.value3.length===0 || this.state.opening.length===0) {
                alert("One of your inputs was empty. Try again.");
                return;
              }
              console.log("returnInputValues was called");
              //TODO: check for proper inputs
              
              var val1Check = isNumber(this.state.value1);
              var val2Check = isNumber(this.state.value2);
              var val3Check = isNumber(this.state.value3);
              var openCheck = isNumber(this.state.opening);
              if(!val1Check || !val2Check || !val3Check || !openCheck)
              {
                alert("One of your inputs was invalid. Try again");
                return;
              }
              var val1 = parseFloat(this.state.value1); 
              var val2 = parseFloat(this.state.value2); 
              var val3 = parseFloat(this.state.value3); 
              var open = parseFloat(this.state.opening); 
              
              this.props.calculateInputs(val1,val2,val3,open); //is this the best way to send back inputs?
            },
            render:function(){
                return (
                        <div>
                          <table className="input-table">
                            <tr>
                              <th className="table-header"><div className="custom-h2">Input</div></th>
                            </tr>
                            <tr className="spaceUnder">
                              <td>Forecast</td>
                              <td><InputComponent update={this.update} name="value1" value={this.state.value1} /> / </td>
                              <td><InputComponent update={this.update} name="value2" value={this.state.value2}/> / </td>
                              <td><InputComponent update={this.update} name="value3" value={this.state.value3}/></td>
                            </tr>
                            <tr className="spaceUnder">
                              <td>Opening</td>
                              <td><InputComponent update={this.update} name="opening" value= {this.state.opening} /></td>
                            </tr>
                            <tr>
                              <td><ButtonComponent txt="Calculate" onClick={this.returnInputValues} /></td>
                            </tr>
                          </table>
                        </div>
                    )
            }
        });

var InputComponent = 
        React.createClass({
            handleChange: function(){
              console.log("handleChange was called");
              var newValue = React.findDOMNode(this.refs.text).value.trim();
              this.props.update(this.props.name,newValue);
            },
            render: function() {
                return <input type="text" ref="text" placeholder="Enter Value" onChange={this.handleChange} />;
            }
      });
      
var ButtonComponent = 
        React.createClass({
            render:function(){
                return <button onClick={this.handleClick}>{this.props.txt}</button>
            },
            handleClick: function(){
              console.log("button was clicked");
              this.props.onClick();
            }
        });        


var Output = 
         React.createClass({
           render:function(){
                if(this.props.inputsHaveBeenCalc)
                {
                  return (
                          <div>
                          <p>Buy Rate <OutputComponent ref="bRate" value= {this.props.values.buyRate} /> Sell Rate <OutputComponent ref="sRate"  value= {this.props.values.sellRate}/></p>
                          <p>S/L      <OutputComponent ref="buySL" value= {this.props.values.buyStopLoss} /> S/L       <OutputComponent ref="sellSL"  value= {this.props.values.sellStopLoss}/></p>
                          <p>T/P      <OutputComponent ref="buyTP" value= {this.props.values.buyTopProfit} /> T/P       <OutputComponent ref="sellTP" value= {this.props.values.sellTopProfit}/></p>
                          </div>
                      )
                }
                else
                {
                  console.log("Rendered without values");
                  return (
                          <div>
                          <p>Buy Rate <OutputComponent ref="bRate" value= "" /> Sell Rate <OutputComponent ref="sRate"  value= ""/></p>
                          <p>S/L      <OutputComponent ref="buySL" value= "" /> S/L       <OutputComponent ref="sellSL"  value= ""/></p>
                          <p>T/P      <OutputComponent ref="buyTP" value= "" /> T/P       <OutputComponent ref="sellTP" value= ""/></p>
                          </div>
                      )
                }
            }
        });
      
      var OutputComponent = 
        React.createClass({
           handleChange: function(event) {
                //this.setState({value: event.target.value});
            },
            render: function() {
                if(this.props.value !== "")
                {
                  var valueRounded = round(this.props.value, 4);
                  return <input type="text" value={valueRounded} readOnly/>;    
                } 
                else
                {
                  return <input type="text" value={this.props.value} readOnly/>;
                } 
            }
      });





      React.render(<Calculator/>, document.getElementById('calculator'))
    

