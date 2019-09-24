/*
 *  Copyright 2018-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Diego Camarmas Alonso
 *
 *  This file is part of CREATOR.
 *
 *  CREATOR is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  CREATOR is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with CREATOR.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

/********************
 * Global variables *
 ********************/

/*Architecture editor*/

/*Available architectures*/
var architecture_available = [];
/*New architectures*/
var load_architectures_available = [];
var load_architectures = [];
/*Architectures card background*/
var back_card = [];
/*Load architecture*/
var architecture = {components:[], instructions:[], directives:[], memory_layout:[]};
var architecture_hash = [];
/*Components form select*/
var componentsTypes = [
  { text: 'Integer', value: 'integer' },
  { text: 'Floating point', value: 'floating point' },
  { text: 'Control', value: 'control' },
];
/*Intructions form select*/
var instructionsTypes = [
  { text: 'Arithmetic integer', value: 'Arithmetic integer' },
  { text: 'Arithmetic floating point', value: 'Arithmetic floating point' },
  { text: 'Logic', value: 'Logic' },
  { text: 'Transfer between registers', value: 'Transfer between registers' },
  { text: 'Memory access', value: 'Memory access' },
  { text: 'Comparison', value: 'Comparison' },
  { text: 'I/O', value: 'I/O' },
  { text: 'Syscall', value: 'Syscall' },
  { text: 'Control', value: 'Control' },
  { text: 'Function call', value: 'Function call' },
  { text: 'Conditional bifurcation', value: 'Conditional bifurcation' },
  { text: 'Unconditional bifurcation', value: 'Unconditional bifurcation' },
  { text: 'Other', value: 'Other' },
];
/*Directives form select*/
var actionTypes = [
  { text: 'Data Segment', value: 'data_segment' },
  { text: 'Code Segment', value: 'code_segment' },
  { text: 'Global Symbol', value: 'global_symbol' },
  { text: 'Byte', value: 'byte' },
  { text: 'Half Word', value: 'half_word' },
  { text: 'Word', value: 'word' },
  { text: 'Double Word', value: 'double_word' },
  { text: 'Float', value: 'float' },
  { text: 'Double', value: 'double' },
  { text: 'Space', value: 'space' },
  { text: 'ASCII not finished in null', value: 'ascii_not_null_end' },
  { text: 'ASCII finished in null', value: 'ascii_null_end' },
  { text: 'Align', value: 'align' },
];



/*
 * Compilator
 */

/*Assembly code textarea*/
var code_assembly = '';
/*Compilation index*/
var tokenIndex = 0;
/*Instructions memory address*/
var address;
/*Data memory address*/
var data_address;
/*Stack memory address*/
var stack_address;
/*Backup memory address*/
var backup_stack_address;
var backup_data_address;
/*Pending instructions and pending tags*/
var pending_instructions = [];
var pending_tags = [];
/*Global functions*/
var extern = [];
/*Error code messages*/
var compileError = [
  { mess1: "Empty label", mess2: "" },
  { mess1: "Repeated tag: ", mess2: "" },
  { mess1: "Instruction '", mess2: "' not found" },
  { mess1: "Incorrect sintax --> ", mess2: "" },
  { mess1: "Register '", mess2: "' not found" },
  { mess1: "Immediate number '", mess2: "' is too big" },
  { mess1: "Immediate number '", mess2: "' is not valid" },
  { mess1: "Tag '", mess2: "' is not valid" },
  { mess1: "Address '", mess2: "' is too big" },
  { mess1: "Address '", mess2: "' is not valid" },
  { mess1: "This field '", mess2: "' must start with a '('" },
  { mess1: "This field '", mess2: "' must end with a ')'" },
  { mess1: "This field is too small to encode in binary '", mess2: "" },
  { mess1: "This field is too small to encode in binary '", mess2: "" },
  { mess1: "Incorrect pseudoinstruction definition ", mess2: "" },
  { mess1: "Invalid directive: ", mess2: "" },
  { mess1: "Invalid data: ", mess2: " The data must be a number" },
  { mess1: 'The string of characters must start with "', mess2: "" },
  { mess1: "Number '", mess2: "' is too big" },
  { mess1: "Number '", mess2: "' is empty" },
  { mess1: "The text segment should start with '", mess2: "'" },
  { mess1: "The data must be aligned", mess2: "" },
  { mess1: "The number should be positive '", mess2: "'" },
  { mess1: "Empty directive", mess2: "" },
  { mess1: "After the comma you should go a blank --> ", mess2: "" },
  { mess1: "Incorrect sintax", mess2: "" },
];
/*Promise*/
let promise;



/*
 * Simulator
 */

/*Displayed notifications*/
var notifications = [];
/*Available examples*/
var example_available = [];
/*Execution*/
var executionIndex = 0;
var runExecution = false;
var iter1 = 1;
var executionInit = 1;
/*Keyboard*/
var consoleMutex = false;
var mutexRead = false;
var newExecution = true;
/*Memory*/
var memory_hash = ["data_memory", "instructions_memory", "stack_memory"];
var memory = {data_memory: [], instructions_memory: [], stack_memory: []};
var unallocated_memory = [];
/*Instructions memory*/
var instructions = [];
var instructions_tag = [];
var instructions_binary = [];
/*Data memory*/
var data = [];
var data_tag = [];
/*Binary*/
var code_binary = '';
var update_binary = '';
/*Stats*/
var totalStats = 0;
var stats = [
  { type: 'Arithmetic integer', number_instructions: 0, percentage: 0, abbreviation: "AI" },
  { type: 'Arithmetic floating point', number_instructions: 0, percentage: 0, abbreviation: "AFP" },
  { type: 'Logic', number_instructions: 0, percentage: 0, abbreviation: "Log" },
  { type: 'Transfer between registers', number_instructions: 0, percentage: 0, abbreviation: "Trans" },
  { type: 'Memory access', number_instructions: 0, percentage: 0, abbreviation: "Mem" },
  { type: 'Comparison', number_instructions: 0, percentage: 0, abbreviation: "Comp" },
  { type: 'I/O', number_instructions: 0, percentage: 0, abbreviation: "I/O" },
  { type: 'Syscall', number_instructions: 0, percentage: 0, abbreviation: "Sys" },
  { type: 'Control', number_instructions: 0, percentage: 0, abbreviation: "Ctrl" },
  { type: 'Function call', number_instructions: 0, percentage: 0, abbreviation: "FC" },
  { type: 'Conditional bifurcation', number_instructions: 0, percentage: 0, abbreviation: "CB" },
  { type: 'Unconditional bifurcation', number_instructions: 0, percentage: 0, abbreviation: "UB" },
  { type: 'Other', number_instructions: 0, percentage: 0, abbreviation: "Oth" },
];


//
// Load architecture
//

function load_arch_select(cfg)
{
    var ret = {};

    var auxArchitecture = cfg;
    architecture = bigInt_deserialize(auxArchitecture);

    architecture_hash = [];
    for (var i = 0; i < architecture.components.length; i++){
      architecture_hash.push({name: architecture.components[i].name, index: i});
    }

    backup_stack_address = architecture.memory_layout[4].value;
    backup_data_address = architecture.memory_layout[3].value;

    ret.token = "The selected architecture has been loaded correctly";
    ret.type = "success";
    return ret;
}


//
// Lex. functions
//

var debug = false ;

function console_log ( msg )
{
	if (debug) {
	    console.log(msg) ;
        }
}

/*Places the pointer in the first position*/
function first_token()
{
  var index = tokenIndex;

  while ( (":\t\n \r#".indexOf(assembly.charAt(index)) != -1) && (index < assembly.length) )
//while ( 
//	  ((assembly.charAt(index) == ':') || 
//	   (assembly.charAt(index) == '\t') || 
//	   (assembly.charAt(index) == '\n') || 
//	   (assembly.charAt(index) == ' ') || 
//	   (assembly.charAt(index) == '\r') || 
//	   (assembly.charAt(index) == '#')) && (index < assembly.length))
	{
            while ( (":\t\n \r".indexOf(assembly.charAt(index)) != -1) && (index < assembly.length) )
	  //while(((assembly.charAt(index) == ':') || 
	//	    (assembly.charAt(index) == '\t') || 
	//	    (assembly.charAt(index) == '\n') || 
	//	    (assembly.charAt(index) == ' ') || 
	//	    (assembly.charAt(index) == '\r')) && (index < assembly.length))
	    {
	      index++;
	    }

            if (assembly.charAt(index) == '#')
	    {
              while((assembly.charAt(index) != '\n') && (index < assembly.length)){
                index++;
              }

              while ( (":\t\n \r".indexOf(assembly.charAt(index)) != -1) && (index < assembly.length) )
           // while(((assembly.charAt(index) == ':') || 
	   //         (assembly.charAt(index) == '\t') || 
	   //         (assembly.charAt(index) == '\n') || 
	   //         (assembly.charAt(index) == ' ') || 
	   //         (assembly.charAt(index) == '\r')) && (index < assembly.length))
	      {
                index++;
              }
            }
        }

  tokenIndex = index;
}

/*Read token*/
function get_token()
{
  var index = tokenIndex;

  if(index >= assembly.length){
    return null;
  }

  console_log(assembly.charAt(index));
  console_log(index);

  if(assembly.charAt(index) == "'"){
    index++;
    while(assembly.charAt(index) != "'" && index < assembly.length){
      console_log(assembly.charAt(index));
      console_log(index);
      index++;
    }
    index++;

    console_log(assembly.substring(tokenIndex, index));
    console_log(index);
    console_log(assembly.substring(tokenIndex, index));
    return assembly.substring(tokenIndex, index);
  }

  if(assembly.charAt(index) == '"'){
    index++;
    while(assembly.charAt(index) != '"' && index < assembly.length){
      console_log(assembly.charAt(index));
      console_log(index);
      index++;
    }
    index++;

    console_log(assembly.substring(tokenIndex, index));
    console_log(index);
    console_log(assembly.substring(tokenIndex, index));
    return assembly.substring(tokenIndex, index);
  }



  if((assembly.charAt(index) == '(') || 
   (assembly.charAt(index) == '[') || 
   (assembly.charAt(index) == '{')){
    index++;
  }

  while((assembly.charAt(index) != ',') && (assembly.charAt(index) != '(') && (assembly.charAt(index) != ')') && (assembly.charAt(index) != '[') && (assembly.charAt(index) != ']') && (assembly.charAt(index) != '{') && (assembly.charAt(index) != '}') && (assembly.charAt(index) != ':') && (assembly.charAt(index) != '#') && (assembly.charAt(index) != '\t') && (assembly.charAt(index) != '\n') && (assembly.charAt(index) != ' ') && (assembly.charAt(index) != '\r') && (index < assembly.length)){
    index++;
  }

  var res;
  if((assembly.charAt(index) == ':') || 
   (assembly.charAt(index) == ')') || 
   (assembly.charAt(index) == ']') || 
   (assembly.charAt(index) == '}')){
    res = assembly.substring(tokenIndex, index) + assembly.charAt(index);
  }
  else{
    res = assembly.substring(tokenIndex, index);
  }

  return res;
}


/*Places the pointer in the start of next token*/
function next_token()
{
  var index = tokenIndex;

  console_log(assembly.charAt(index));
  if(assembly.charAt(index) == "'"){
    index++;
    while(assembly.charAt(index) != "'" && index < assembly.length){
      console_log(assembly.charAt(index));
      index++;
    }
    index++;
  }

  if(assembly.charAt(index) == '"'){
    index++;
    while(assembly.charAt(index) != '"' && index < assembly.length){
      console_log(assembly.charAt(index));
      index++;
    }
    index++;
  }

  if((assembly.charAt(index) == '(') || 
   (assembly.charAt(index) == '[') || 
   (assembly.charAt(index) == '{')){
    index++;
  }

  while ( (",()[]{}:#\t\n \r".indexOf(assembly.charAt(index)) == -1) && (index < assembly.length) )
//while ( (assembly.charAt(index) != ',') && 
//	  (assembly.charAt(index) != '(') && 
//	  (assembly.charAt(index) != ')') && 
//	  (assembly.charAt(index) != '[') && 
//	  (assembly.charAt(index) != ']') && 
//	  (assembly.charAt(index) != '{') && 
//	  (assembly.charAt(index) != '}') && 
//	  (assembly.charAt(index) != ':') && 
//	  (assembly.charAt(index) != '#') && 
//	  (assembly.charAt(index) != '\t') && 
//	  (assembly.charAt(index) != '\n') && 
//	  (assembly.charAt(index) != ' ') && 
//	  (assembly.charAt(index) != '\r') && 
//	  (index < assembly.length))
	{
           index++;
        }

  while ( (",()[]{}:\t\n \r#".indexOf(assembly.charAt(index)) != -1) && (index < assembly.length) )
//while(((assembly.charAt(index) == ',') || 
// (assembly.charAt(index) == '(') || 
// (assembly.charAt(index) ==')') || 
// (assembly.charAt(index) == '[') || 
// (assembly.charAt(index) == ']') || 
// (assembly.charAt(index) == '{') || 
// (assembly.charAt(index) == '}') || 
// (assembly.charAt(index) == ':') || 
// (assembly.charAt(index) == '\t') || 
// (assembly.charAt(index) == '\n') || 
// (assembly.charAt(index) == ' ') || 
// (assembly.charAt(index) == '\r') || 
// (assembly.charAt(index) == '#')) && (index < assembly.length))
  {
    while ( (",)]}:\t\n \r".indexOf(assembly.charAt(index)) != -1) && (index < assembly.length) )
//  while(((assembly.charAt(index) ==',') || 
//	    (assembly.charAt(index) ==')') || 
//	    (assembly.charAt(index) == ']') || 
//	    (assembly.charAt(index) == '}') || 
//	    (assembly.charAt(index) == ':') || 
//	    (assembly.charAt(index) == '\t') || 
//	    (assembly.charAt(index) == '\n') || 
//	    (assembly.charAt(index) == ' ') || 
//	    (assembly.charAt(index) == '\r')) && (index < assembly.length))
	  {
            index++;
          }

    if ((assembly.charAt(index) =='(') || 
	(assembly.charAt(index) == '[') || 
	(assembly.charAt(index) == '{'))
    {
      break;
    }

    if (assembly.charAt(index) == '#')
    {
      while ((assembly.charAt(index) != '\n') && (index < assembly.length)){
        index++;
      }

      while ( ("()[]{}:\t\n \r".indexOf(assembly.charAt(index)) != -1) && (index < assembly.length) )
    //while(((assembly.charAt(index) == '(') || 
//	      (assembly.charAt(index) ==')') || 
//	      (assembly.charAt(index) == '[') || 
//	      (assembly.charAt(index) == ']') || 
//	      (assembly.charAt(index) == '{') || 
//	      (assembly.charAt(index) == '}') || 
//	      (assembly.charAt(index) == ':') || 
//	      (assembly.charAt(index) == '\t') || 
//	      (assembly.charAt(index) == '\n') || 
//	      (assembly.charAt(index) == ' ') || 
//	      (assembly.charAt(index) == '\r')) && (index < assembly.length))
	    {
               index++;
            }
    }
  }
  tokenIndex = index;
}


/*
 * Compile assembly code
 */

function assembly_compiler(assembly_code)
{
	var ret = {
		            update: "",
		            status: "ok"
	} ;

  assembly = assembly_code ;

  instructions = [];
  instructions_tag = [];
  pending_instructions = [];
  pending_tags = [];
  memory[memory_hash[0]] = [];
  data_tag = [];
  instructions_binary =[];
  memory[memory_hash[1]] = [];
  extern = [];
  memory[memory_hash[2]] = [];
  data = [];
  executionInit = 1;
  mutexRead = false;

  if(update_binary.instructions_binary != null){
    for(var i = 0; i < update_binary.instructions_binary.length; i++){
      instructions.push(update_binary.instructions_binary[i]);
      if(i == 0){
        instructions[instructions.length-1].hide = false;
        if(update_binary.instructions_binary[i].globl == false){
          instructions[instructions.length-1].Label = "";
        }
      }
      else if(update_binary.instructions_binary[i].globl == false){
        instructions[instructions.length-1].Label = "";
        instructions[instructions.length-1].hide = true;
      }
      else if(update_binary.instructions_binary[i].globl == null){
        instructions[instructions.length-1].hide = true;
      }
      else{
        instructions[instructions.length-1].hide = false;
      }

      address = parseInt(instructions[instructions.length-1].Address, 16) + 4;
    }
  }
  else{
    address = parseInt(architecture.memory_layout[0].value);
  }

  var numBinaries = instructions.length;


  /*Allocation of memory addresses*/
  architecture.memory_layout[4].value = backup_stack_address;
  architecture.memory_layout[3].value = backup_data_address;
  data_address = parseInt(architecture.memory_layout[2].value);
  stack_address = parseInt(architecture.memory_layout[4].value);

  architecture.components[1].elements[29].value = bigInt(stack_address).value;
  architecture.components[0].elements[0].value = bigInt(address).value;
  architecture.components[1].elements[29].default_value = bigInt(stack_address).value;
  architecture.components[0].elements[0].default_value = bigInt(address).value;

  /*Reset stats*/
  totalStats = 0;
  for (var i = 0; i < stats.length; i++){
    stats[i].percentage = 0;
    stats[i].number_instructions = 0;
  }

  align = 0;
  var empty = false;

  /*Save a backup in the cache memory*/
  if (typeof(Storage) !== "undefined") {
    var auxObject = jQuery.extend(true, {}, architecture);

    var auxArchitecture = bigInt_serialize(auxObject);
    var auxArch = JSON.stringify(auxArchitecture, null, 2);

    var date = new Date();
    var auxDate = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" - "+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    //console_log(app._data.architecture_name);
    /*localStorage.setItem("arch_name", app._data.architecture_name);
    localStorage.setItem("architecture_copy", auxArch);
    localStorage.setItem("assembly_copy", textarea_assembly_editor.getValue());
    localStorage.setItem("date_copy", auxDate);*/
  }

  /*Start of compilation*/
  first_token();

  if (get_token() == null){
    ret.update = "memory" ;
   	ret.status = "warning" ;
    ret.token = "Please enter the assembly code before compiling";
    ret.type = "danger";
    return ret;
  }

  token = get_token();
  console_log(token)

  while(!empty){
    token = get_token();
    console_log(token)

    if(token == null){
      empty = true;
      break;
    }

    var change = false;

    for(var i = 0; i < architecture.directives.length; i++){
      if(token == architecture.directives[i].name){
        switch(architecture.directives[i].action){
          case "data_segment":
            console_log("data_segment")
            var result = data_segment_compiler();
            if(result == 0){
              change = true;
            }
            if(result == -1){
              tokenIndex = 0;
              instructions = [];
              pending_instructions = [];
              pending_tags = [];
              memory[memory_hash[0]] = [];
              data_tag = [];
              instructions_binary = [];
              memory[memory_hash[1]] = [];
              memory[memory_hash[2]] = [];
              data = [];
              extern = [];

              ret.update = "memory" ;
				     	ret.status = "ok" ;
				      return ret;
            }
            break;
          case "code_segment":
            console_log("code_segment")
            var result = code_segment_compiler();
            if(result == 0){
              change = true;
            }
            if(result == -1){
              tokenIndex = 0;
              instructions = [];
              pending_instructions = [];
              pending_tags = [];
              memory[memory_hash[0]] = [];
              data_tag = [];
              instructions_binary = [];
              memory[memory_hash[1]] = [];
              extern = [];
              memory[memory_hash[2]] = [];
              data = [];
              ret.update = "memory" ;
				     	ret.status = "ok" ;
				      return ret;
            }
            break;
          case "global_symbol":

            var isGlobl = true;
            next_token();

            while(isGlobl){
              token = get_token();

              re = new RegExp(",", "g");
              token = token.replace(re, "");

              console_log(token)
              extern.push(token);
              change = true;

              next_token();
              token = get_token();

              console_log(token)

              for(var z = 0; z < architecture.directives.length; z++){
                if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                  isGlobl = false;
                }
              }
            }

            break;
          default:
            console_log("default")
            empty = true;
            break;
        }
      }

      else if(i== architecture.directives.length-1 && token != architecture.directives[i].name && change == false && token != null){
        empty = true;

        ret.status = "error" ;
        ret.errorcode = 15;
        ret.token = token;
        ret.tokenIndex = tokenIndex;
        tokenIndex = 0;
        return ret ;
      }
    }
  }

  var found = false;

  if(update_binary.instructions_binary != null){
    for(var j = 0; j<instructions.length; j++){
      if(instructions[j].Label != ""){
        for(var i = 0; i<update_binary.instructions_tag.length; i++){
          if(instructions[j].Label == update_binary.instructions_tag[i].tag){
            update_binary.instructions_tag[i].addr = instructions[j].Address;
          }
        }
      }
    }
  }

  /*Check pending instructions*/
  for(var i = 0; i < pending_instructions.length; i++){
    var exit = 0;
    var signatureParts = pending_instructions[i].signature;
    var signatureRawParts = pending_instructions[i].signatureRaw;
    var instructionParts = (pending_instructions[i].instruction).split(' ');
    console_log(instructionParts);
    for (var j = 0; j < signatureParts.length && exit == 0; j++){
      if(signatureParts[j] == "inm" || signatureParts[j] == "address"){
        for (var z = 0; z < instructions.length && exit == 0; z++){
          if(instructions[z].Label == instructionParts[j]){
            var addr = instructions[z].Address;
            var bin = parseInt(addr, 16).toString(2);
            var startbit = pending_instructions[i].startBit;
            var stopbit = pending_instructions[i].stopBit;

            instructionParts[j] = addr;
            var newInstruction = "";
            for (var w = 0; w < instructionParts.length; w++) {
              if(w == instructionParts.length-1){
                newInstruction = newInstruction + instructionParts[w];
              }
              else{
                newInstruction = newInstruction + instructionParts[w] + " ";
              }
            }
            for (var w = 0; w < instructions.length && exit == 0; w++) {
              var aux = "0x" + (pending_instructions[i].address).toString(16);
              if(aux == instructions[w].Address){
                instructions[w].loaded = newInstruction;
              }
            }

            for (var w = 0; w < instructions.length && exit == 0; w++) {
              var aux = "0x" + (pending_instructions[i].address).toString(16);
              if(aux == instructions[w].Address){
                instructions[w].loaded = newInstruction;
                var fieldsLength = startbit - stopbit + 1;
                console_log(w)
                console_log(numBinaries)
                console_log(w - numBinaries)
                instructions_binary[w - numBinaries].loaded = instructions_binary[w - numBinaries].loaded.substring(0, instructions_binary[w - numBinaries].loaded.length - (startbit + 1)) + bin.padStart(fieldsLength, "0") + instructions_binary[w - numBinaries].loaded.substring(instructions_binary[w - numBinaries].loaded.length - stopbit, instructions_binary[w - numBinaries].loaded.length);
                exit = 1;
              }
            }
          }
        }

        for (var z = 0; z < memory[memory_hash[0]].length && exit == 0; z++){
          for (var p = 0; p < memory[memory_hash[0]][z].Binary.length && exit == 0; p++){
            if(instructionParts[j] == memory[memory_hash[0]][z].Binary[p].Tag){
              var addr = (memory[memory_hash[0]][z].Binary[p].Addr);
              var bin = parseInt(addr, 16).toString(2);
              var startbit = pending_instructions[i].startBit;
              var stopbit = pending_instructions[i].stopBit;

              instructionParts[j] = "0x" + addr.toString(16);
              var newInstruction = "";
              for (var w = 0; w < instructionParts.length; w++) {
                if(w == instructionParts.length-1){
                  newInstruction = newInstruction + instructionParts[w];
                }
                else{
                  newInstruction = newInstruction + instructionParts[w] + " ";
                }
              }
              for (var w = 0; w < instructions.length && exit == 0; w++) {
                var aux = "0x" + (pending_instructions[i].address).toString(16);
                if(aux == instructions[w].Address){
                  instructions[w].loaded = newInstruction;
                }
              }

              for (var w = 0; w < instructions.length && exit == 0; w++) {
                var aux = "0x" + (pending_instructions[i].address).toString(16);
                if(aux == instructions[w].Address){
                  instructions[w].loaded = newInstruction;
                  var fieldsLength = startbit - stopbit + 1;
                  instructions_binary[w - numBinaries].loaded = instructions_binary[w - numBinaries].loaded.substring(0, instructions_binary[w - numBinaries].loaded.length - (startbit + 1)) + bin.padStart(fieldsLength, "0") + instructions_binary[w - numBinaries].loaded.substring(instructions_binary[w - numBinaries].loaded.length - stopbit, instructions_binary[w - numBinaries].loaded.length);
                  exit = 1;
                }
              }

            }
          }
        }

        if(exit == 0 && isNaN(instructionParts[j]) == true){
        	ret.status = "error" ;
	        ret.errorcode = 7;
	        ret.token = instructionParts[j];
	        ret.tokenIndex = tokenIndex;
	        tokenIndex = 0;

          instructions = [];
          pending_instructions = [];
          pending_tags = [];
          memory[memory_hash[0]] = [];
          data_tag = [];
          instructions_binary = [];
          memory[memory_hash[1]] = [];
          memory[memory_hash[2]] = [];
          data = [];
          extern = [];
          return ret;
        }
      }

      if(signatureParts[j] == "offset_words"){
        for (var z = 0; z < instructions.length && exit == 0; z++){
          if(instructions[z].Label == instructionParts[j]){
            var addr = instructions[z].Address;
            //var bin = parseInt(addr, 16).toString(2);
            var startbit = pending_instructions[i].startBit;
            var stopbit = pending_instructions[i].stopBit;

            addr = ((addr - pending_instructions[i].address)/4)-1;
            console_log(instructionParts);
            console_log(addr);
            var bin = parseInt(addr).toString(2);
            console_log(bin);

            instructionParts[j] = addr;
            var newInstruction = "";
            for (var w = 0; w < instructionParts.length; w++) {
              if(w == instructionParts.length-1){
                newInstruction = newInstruction + instructionParts[w];
              }
              else{
                newInstruction = newInstruction + instructionParts[w] + " ";
              }
            }
            for (var w = 0; w < instructions.length && exit == 0; w++) {
              var aux = "0x" + (pending_instructions[i].address).toString(16);
              if(aux == instructions[w].Address){
                instructions[w].loaded = newInstruction;
              }
            }

            for (var w = 0; w < instructions.length && exit == 0; w++) {
              var aux = "0x" + (pending_instructions[i].address).toString(16);
              if(aux == instructions[w].Address){
                instructions[w].loaded = newInstruction;
                var fieldsLength = startbit - stopbit + 1;
                console_log(w);
                console_log(numBinaries);
                console_log(w - numBinaries);
                console_log(bin.padStart(fieldsLength, "0"));
                instructions_binary[w - numBinaries].loaded = instructions_binary[w - numBinaries].loaded.substring(0, instructions_binary[w - numBinaries].loaded.length - (startbit + 1)) + bin.padStart(fieldsLength, "0") + instructions_binary[w - numBinaries].loaded.substring(instructions_binary[w - numBinaries].loaded.length - stopbit, instructions_binary[w - numBinaries].loaded.length);
                exit = 1;
              }
            }
          }
        }

        if(exit == 0){
        	ret.status = "error" ;
	        ret.errorcode = 7;
	        ret.token = instructionParts[j];
	        ret.tokenIndex = tokenIndex;
	        tokenIndex = 0;

          instructions = [];
          pending_instructions = [];
          pending_tags = [];
          memory[memory_hash[0]] = [];
          data_tag = [];
          instructions_binary = [];
          memory[memory_hash[1]] = [];
          memory[memory_hash[2]] = [];
          data = [];
          extern = [];
          return ret;
        }
      }

      if(signatureParts[j] == "offset_bytes"){
        for (var z = 0; z < instructions.length && exit == 0; z++){
          if(instructions[z].Label == instructionParts[j]){
            var addr = instructions[z].Address;
            var bin = parseInt(addr, 16).toString(2);
            var startbit = pending_instructions[i].startBit;
            var stopbit = pending_instructions[i].stopBit;

            addr = ((addr - pending_instructions[i].address))-1;

            instructionParts[j] = addr;
            var newInstruction = "";
            for (var w = 0; w < instructionParts.length; w++) {
              if(w == instructionParts.length-1){
                newInstruction = newInstruction + instructionParts[w];
              }
              else{
                newInstruction = newInstruction + instructionParts[w] + " ";
              }
            }
            for (var w = 0; w < instructions.length && exit == 0; w++) {
              var aux = "0x" + (pending_instructions[i].address).toString(16);
              if(aux == instructions[w].Address){
                instructions[w].loaded = newInstruction;
              }
            }

            for (var w = 0; w < instructions.length && exit == 0; w++) {
              var aux = "0x" + (pending_instructions[i].address).toString(16);
              if(aux == instructions[w].Address){
                instructions[w].loaded = newInstruction;
                var fieldsLength = startbit - stopbit + 1;
                console_log(w)
                console_log(numBinaries)
                console_log(w - numBinaries)
                instructions_binary[w - numBinaries].loaded = instructions_binary[w - numBinaries].loaded.substring(0, instructions_binary[w - numBinaries].loaded.length - (startbit + 1)) + bin.padStart(fieldsLength, "0") + instructions_binary[w - numBinaries].loaded.substring(instructions_binary[w - numBinaries].loaded.length - stopbit, instructions_binary[w - numBinaries].loaded.length);
                exit = 1;
              }
            }
          }
        }

        if(exit == 0){
          ret.status = "error" ;
	        ret.errorcode = 7;
	        ret.token = instructionParts[j];
	        ret.tokenIndex = tokenIndex;
	        tokenIndex = 0;

          instructions = [];
          pending_instructions = [];
          pending_tags = [];
          memory[memory_hash[0]] = [];
          data_tag = [];
          instructions_binary = [];
          memory[memory_hash[1]] = [];
          memory[memory_hash[2]] = [];
          data = [];
          extern = [];
          return ret;
        }
      }
    }
  }

  /*Enter the binary in the text segment*/
  if(update_binary.instructions_binary != null){
    for (var i = 0; i < update_binary.instructions_binary.length; i++){
      var hex = bin2hex(update_binary.instructions_binary[i].loaded);
      var auxAddr = parseInt(update_binary.instructions_binary[i].Address, 16);
      var label = update_binary.instructions_binary[i].Label;
      var hide;

      if(i == 0){
        hide = false;
        if(update_binary.instructions_binary[i].globl == false){
          label = "";
        }
      }
      else if(update_binary.instructions_binary[i].globl == false){
        label = "";
        hide = true;
      }
      else if(update_binary.instructions_binary[i].globl == null){
        hide = true;
      }
      else{
        hide = false;
      }

      for(var a = 0; a < hex.length/2; a++){
        if(auxAddr % 4 == 0){
          memory[memory_hash[1]].push({Address: auxAddr, Binary: [], Value: "********", hide: hide});
          if(label == ""){
            label=null;
          }

          if(a == 0){
            (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).push({Addr: (auxAddr), DefBin: "**", Bin: "**", Tag: label},);
          }
          else{
            (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).push({Addr: (auxAddr), DefBin: "**", Bin: "**", Tag: null},);
          }

          auxAddr++;
        }
        else{
          if(a == 0){
            console_log(label);
            (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).splice(auxAddr%4, 1, {Addr: (auxAddr), DefBin: "**", Bin: "**", Tag: label},);
          }
          else{
            (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).splice(auxAddr%4, 1, {Addr: (auxAddr), DefBin: "**", Bin: "**", Tag: null},);
          }

          auxAddr++;
        }
      }

      if(memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary.length < 4){
        var num_iter = 4 - memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary.length;
        for(var b = 0; b < num_iter; b++){
          (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).push({Addr: (auxAddr + (b + 1)), DefBin: "**", Bin: "**", Tag: null},);
        }
      }

      //app._data.memory[memory_hash[1]] = memory[memory_hash[1]];
    }
  }

  /*Enter the compilated instructions in the text segment*/
  for (var i = 0; i < instructions_binary.length; i++){
    var hex = bin2hex(instructions_binary[i].loaded);
    var auxAddr = parseInt(instructions_binary[i].Address, 16);
    var label = instructions_binary[i].Label;
    var binNum = 0;

    if(update_binary.instructions_binary != null){
      binNum = update_binary.instructions_binary.length
    }

    for(var a = 0; a < hex.length/2; a++){
      if(auxAddr % 4 == 0){
        memory[memory_hash[1]].push({Address: auxAddr, Binary: [], Value: instructions[i + binNum].loaded, hide: false});
        if(label == ""){
          label=null;
        }
        if(a == 0){
          (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).push({Addr: (auxAddr), DefBin: hex.substring(hex.length-(2+(2*a)), hex.length-(2*a)), Bin: hex.substring(hex.length-(2+(2*a)), hex.length-(2*a)), Tag: label},);
        }
        else{
          (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).push({Addr: (auxAddr), DefBin: hex.substring(hex.length-(2+(2*a)), hex.length-(2*a)), Bin: hex.substring(hex.length-(2+(2*a)), hex.length-(2*a)), Tag: null},);
        }

        auxAddr++;
      }
      else{
        if(a == 0){
          console_log(label);
          (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).splice(auxAddr%4, 1, {Addr: (auxAddr), DefBin: hex.substring(hex.length-(2+(2*a)), hex.length-(2*a)), Bin: hex.substring(hex.length-(2+(2*a)), hex.length-(2*a)), Tag: label},);
        }
        else{
          (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).splice(auxAddr%4, 1, {Addr: (auxAddr), DefBin: hex.substring(hex.length-(2+(2*a)), hex.length-(2*a)), Bin: hex.substring(hex.length-(2+(2*a)), hex.length-(2*a)), Tag: null},);
        }

        auxAddr++;
      }
    }

    if(memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary.length < 4){
      var num_iter = 4 - memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary.length;
      for(var b = 0; b < num_iter; b++){
        (memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary).push({Addr: (auxAddr + (b + 1)), DefBin: "00", Bin: "00", Tag: null},);
      }
    }
    //app._data.memory[memory_hash[1]] = memory[memory_hash[1]];
  }


  /*Check for overlap*/
  if(memory[memory_hash[0]].length > 0){
    if(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary[3].Addr > architecture.memory_layout[3].value){
      tokenIndex = 0;
      instructions = [];
      pending_instructions = [];
      pending_tags = [];
      memory[memory_hash[0]] = [];
      data_tag = [];
      instructions_binary = [];
      memory[memory_hash[1]] = [];
      extern = [];
      memory[memory_hash[2]] = [];
      data = [];

      ret.update = "memory" ;
     	ret.status = "warning" ;
      ret.token = "Data overflow";
      ret.type = "danger";
      return ret;

    }
  }

  if(memory[memory_hash[1]].length > 0){
    if(memory[memory_hash[1]][memory[memory_hash[1]].length-1].Binary[3].Addr > architecture.memory_layout[1].value){
      tokenIndex = 0;
      instructions = [];
      pending_instructions = [];
      pending_tags = [];
      memory[memory_hash[0]] = [];
      data_tag = [];
      instructions_binary = [];
      memory[memory_hash[1]] = [];
      extern = [];
      memory[memory_hash[2]] = [];
      data = [];

      ret.update = "memory" ;
     	ret.status = "warning" ;
      ret.token = "Instruction overflow";
      ret.type = "danger";
      return ret;
    }
  }

  /*Save binary*/
  for(var i = 0; i < instructions_binary.length; i++){
    if(extern.length == 0 && instructions_binary[i].Label != ""){
      instructions_binary[i].Label = instructions_binary[i].Label + "_symbol";
      instructions_binary[i].globl = false;
    }
    else{
      for(var j = 0; j < extern.length; j++){
        if(instructions_binary[i].Label != extern[j] && j == extern.length-1 && instructions_binary[i].Label != ""){
          instructions_binary[i].Label = instructions_binary[i].Label + "_symbol";
          instructions_binary[i].globl = false;
          break;
        }
        else if(instructions_binary[i].Label == extern[j]){
          instructions_binary[i].globl = true;
          break;
        }
      }
    }
  }

  /*Save tags*/
  for(var i = 0; i < instructions_tag.length; i++){
    if(extern.length == 0 && instructions_tag[i].tag != ""){
      instructions_tag[i].tag = instructions_tag[i].tag + "_symbol";
      instructions_tag[i].globl = false;
      break;
    }
    else{
      for(var j = 0; j < extern.length; j++){
        if(instructions_tag[i].tag != extern[j] && j == extern.length-1 && instructions_tag[i].tag != ""){
          instructions_tag[i].tag = instructions_tag[i].tag + "_symbol";
          instructions_tag[i].globl = false;
          break;
        }
        else if(instructions_tag[i].tag == extern[j]){
          instructions_tag[i].globl = true;
          break;
        }
      }
    }
  }

  //app._data.instructions = instructions;

  /*Initialize stack*/
  memory[memory_hash[2]].push({Address: stack_address, Binary: [], Value: null, DefValue: null, reset: false, unallocated: false});

  for(var i = 0; i<4; i++){
    (memory[memory_hash[2]][memory[memory_hash[2]].length-1].Binary).push({Addr: stack_address + i, DefBin: "00", Bin: "00", Tag: null},);
  }

  tokenIndex = 0;

  reset();

  address = architecture.memory_layout[0].value;
  data_address = architecture.memory_layout[2].value;
  stack_address = architecture.memory_layout[4].value;

  ret.update = "memory" ;
 	ret.status = "warning" ;
  ret.token = "Compilation completed successfully";
  ret.type = "success";
  return ret;

}


/*Compile data segment*/
function data_segment_compiler(){
  var existsData = true;

  next_token();

  while(existsData){
    token = get_token();
    console_log(token);

    var label = "";

    if(token == null){
      break;
    }

    console_log(token)

    var found = false;

    if(token.search(/\:$/) != -1){
      if(token.length == 1){
      	ret.status = "error" ;
        ret.errorcode = 0;
        ret.token = "";
        ret.tokenIndex = tokenIndex;

        return ret;
      }

      for(var i = 0; i < data_tag.length; i++){
        console_log(data_tag[i].tag);
        console_log(token.substring(0,token.length-1))
        if(data_tag[i].tag == token.substring(0,token.length-1)){
        	ret.status = "error" ;
	        ret.errorcode = 1;
	        ret.token = token.substring(0,token.length-1);
	        ret.tokenIndex = tokenIndex;
          return ret;
        }
      }

      for(var i = 0; i < instructions.length; i++){
        if(instructions[i].Label == token.substring(0,token.length-1)){
        	ret.status = "error" ;
	        ret.errorcode = 1;
	        ret.token = token.substring(0,token.length-1);
	        ret.tokenIndex = tokenIndex;
          return ret;
        }
      }

      label = token.substring(0,token.length-1);
      next_token();
      token = get_token();
    }

    for(var j = 0; j < architecture.directives.length; j++){
      if(token == architecture.directives[j].name){
        switch(architecture.directives[j].action){
          case "byte":
            var isByte = true;

            next_token();

            while(isByte){
              token = get_token();

              if(token == null){
              	ret.status = "error" ;
				        ret.errorcode = 23;
				        ret.token = "";
				        ret.tokenIndex = tokenIndex;
                return ret;
              }

              re = new RegExp("([0-9A-Fa-f-]),([0-9A-Fa-f-])");
              if(token.search(re) != -1){
              	ret.status = "error" ;
				        ret.errorcode = 24;
				        ret.token = token;
				        ret.tokenIndex = tokenIndex;
                return ret;
              }

              re = new RegExp(",", "g");
              token = token.replace(re, "");

              console_log("byte")
              console_log(token)

              var auxToken;
              var auxTokenString;

              if(token.match(/^\'(.*?)\'$/)){
                var re = /^\'(.*?)\'$/;
                console_log(re);
                var match = re.exec(token);
                console_log(match);
                var asciiCode;

                console_log(match[1]);

                if(token.search(/^\'\\n\'$/) != -1){
                  asciiCode = 10;
                }
                else if(token.search(/^\'\\t\'$/) != -1){
                  asciiCode = 9;
                }
                else{
                  asciiCode = match[1].charCodeAt(0);
                }

                console_log(asciiCode);
                auxTokenString = asciiCode.toString(16);
              }
              else if(token.match(/^0x/)){
                var value = token.split('x');

                re = new RegExp("[0-9A-Fa-f]{"+value[1].length+"}","g");
                if(value[1].search(re) == -1){
                	ret.status = "error" ;
					        ret.errorcode = 16;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
                  return ret;
                }

                auxTokenString = value[1].padStart(2*architecture.directives[j].size, "0");
                if(value[1].length == 0){
                	ret.status = "error" ;
					        ret.errorcode = 19;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
                  return ret;
                }

                if(auxTokenString.length > 2*architecture.directives[j].size){
                	ret.status = "error" ;
					        ret.errorcode = 18;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
                  return ret;
                }
                auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
              }
              else{
                var re = new RegExp("[0-9-]{"+token.length+"}","g");
                if(token.search(re) == -1){
                	ret.status = "error" ;
					        ret.errorcode = 16;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
                  return ret;
                }
                auxToken = parseInt(token) >>> 0;
                auxTokenString = (auxToken.toString(16).substring(auxToken.toString(16).length-2*architecture.directives[j].size, auxToken.toString(16).length)).padStart(2*architecture.directives[j].size, "0");
                if(auxTokenString.length > 2*architecture.directives[j].size){
                	ret.status = "error" ;
					        ret.errorcode = 18;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
                  return ret;
                }
                auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
              }

              console_log(auxTokenString)

              if(data_compiler(auxTokenString, architecture.directives[j].size, label, parseInt(auxTokenString, 16)) == -1){
                return -1;
              }

              label = null;

              console_log(memory[memory_hash[0]]);
              console_log("byte Terminado");

              next_token();
              token = get_token();

              console_log(token);

              for(var z = 0; z < architecture.directives.length; z++){
                if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                  isByte = false;
                }
              }
            }

            j=0;

            break;
          case "half_word":
            console_log("half_word")

            var ishalf = true;

            next_token();

            while(ishalf){
              token = get_token();

              if(token == null){
              	ret.status = "error" ;
				        ret.errorcode = 23;
				        ret.token = "";
				        ret.tokenIndex = tokenIndex;
                return ret;
              }

              re = new RegExp("([0-9A-Fa-f-]),([0-9A-Fa-f-])");
              if(token.search(re) != -1){
              	ret.status = "error" ;
				        ret.errorcode = 24;
				        ret.token = token;
				        ret.tokenIndex = tokenIndex;
                return ret;
              }

              re = new RegExp(",", "g");
              token = token.replace(re, "");

              console_log("half_word");
              console_log(token);

              var auxToken;
              var auxTokenString;
              if(token.match(/^0x/)){
                var value = token.split('x');

                re = new RegExp("[0-9A-Fa-f]{"+value[1].length+"}","g");
                if(value[1].search(re) == -1){
                  ret.status = "error" ;
					        ret.errorcode = 16;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }

                auxTokenString = value[1].padStart(2*architecture.directives[j].size, "0");

                if(value[1].length == 0){
                  ret.status = "error" ;
					        ret.errorcode = 19;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }
                if(auxTokenString.length > 2*architecture.directives[j].size){
                  ret.status = "error" ;
					        ret.errorcode = 18;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }
                auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
              }
              else{
                var re = new RegExp("[0-9-]{"+token.length+"}","g");
                if(token.search(re) == -1){
                  ret.status = "error" ;
					        ret.errorcode = 16;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }
                auxToken = parseInt(token) >>> 0;
                auxTokenString = (auxToken.toString(16).substring(auxToken.toString(16).length-2*architecture.directives[j].size, auxToken.toString(16).length)).padStart(2*architecture.directives[j].size, "0");
                if(auxTokenString.length > 2*architecture.directives[j].size){
                  ret.status = "error" ;
					        ret.errorcode = 18;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }
                auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
              }

              console_log(auxTokenString)

              if(data_compiler(auxTokenString, architecture.directives[j].size, label, parseInt(auxTokenString, 16)) == -1){
                return -1;
              }

              label = null;

              console_log(memory[memory_hash[0]]);
              console_log("half Terminado");

              next_token();
              token = get_token();

              console_log(token);

              for(var z = 0; z < architecture.directives.length; z++){
                if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                  ishalf = false;
                }
              }
            }

            j=0;

            break;
          case "word":
            var isWord = true;

            next_token();

            while(isWord){
              console_log("word")

              token = get_token();

              if(token == null){
                ret.status = "error" ;
				        ret.errorcode = 23;
				        ret.token = token;
				        ret.tokenIndex = tokenIndex;
                return ret;
              }

              re = new RegExp("([0-9A-Fa-f-]),([0-9A-Fa-f-])");
              if(token.search(re) != -1){
                ret.status = "error" ;
				        ret.errorcode = 24;
				        ret.token = token;
				        ret.tokenIndex = tokenIndex;
                return ret;
              }

              re = new RegExp(",", "g");
              token = token.replace(re, "");

              console_log(token);

              var auxToken;
              var auxTokenString;
              if(token.match(/^0x/)){
                var value = token.split('x');

                re = new RegExp("[0-9A-Fa-f]{"+value[1].length+"}","g");
                if(value[1].search(re) == -1){
                  ret.status = "error" ;
					        ret.errorcode = 16;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }

                auxTokenString = value[1].padStart(2*architecture.directives[j].size, "0");
                if(value[1].length == 0){
                  ret.status = "error" ;
					        ret.errorcode = 19;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }
                if(auxTokenString.length > 2*architecture.directives[j].size){
                  ret.status = "error" ;
					        ret.errorcode = 18;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }
                auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
              }
              else{
                var re = new RegExp("[0-9-]{"+token.length+"}","g");
                if(token.search(re) == -1){
                  ret.status = "error" ;
					        ret.errorcode = 16;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }
                auxToken = parseInt(token) >>> 0;
                auxTokenString = (auxToken.toString(16).substring(auxToken.toString(16).length-2*architecture.directives[j].size, auxToken.toString(16).length)).padStart(2*architecture.directives[j].size, "0");
                if(auxTokenString.length > 2*architecture.directives[j].size){
                  ret.status = "error" ;
					        ret.errorcode = 18;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }
                auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
              }

              console_log(auxTokenString);

              if(data_compiler(auxTokenString, architecture.directives[j].size, label, (parseInt(auxTokenString, 16)) >> 0) == -1){
                return -1;
              }

              label = null;

              console_log(memory[memory_hash[0]]);
              console_log("word Terminado");

              next_token();
              token = get_token();

              console_log(token);

              for(var z = 0; z < architecture.directives.length; z++){
                if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                  isWord = false;
                }
              }
              console_log(memory[memory_hash[0]]);
            }

            j=0;

            break;
          case "double_word":
            var isDoubleWord = true;

            next_token();

            while(isDoubleWord){
              console_log("word");

              token = get_token();

              if(token == null){
                ret.status = "error" ;
				        ret.errorcode = 23;
				        ret.token = token;
				        ret.tokenIndex = tokenIndex;
                return ret;
              }

              re = new RegExp("([0-9A-Fa-f-]),([0-9A-Fa-f-])");
              if(token.search(re) != -1){
                ret.status = "error" ;
				        ret.errorcode = 24;
				        ret.token = token;
				        ret.tokenIndex = tokenIndex;
                return ret;
              }

              re = new RegExp(",", "g");
              token = token.replace(re, "");

              console_log(token);

              var auxToken;
              var auxTokenString;
              if(token.match(/^0x/)){
                var value = token.split('x');

                re = new RegExp("[0-9A-Fa-f]{"+value[1].length+"}","g");
                if(value[1].search(re) == -1){
                  ret.status = "error" ;
					        ret.errorcode = 16;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }

                auxTokenString = value[1].padStart(2*architecture.directives[j].size, "0");
                if(value[1].length == 0){
                  ret.status = "error" ;
					        ret.errorcode = 19;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }
                if(auxTokenString.length > 2*architecture.directives[j].size){
                  ret.status = "error" ;
					        ret.errorcode = 18;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }
                auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
              }
              else{
                var re = new RegExp("[0-9-]{"+token.length+"}","g");
                if(token.search(re) == -1){
                  ret.status = "error" ;
					        ret.errorcode = 16;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }
                auxToken = parseInt(token) >>> 0;
                auxTokenString = (auxToken.toString(16).substring(auxToken.toString(16).length-2*architecture.directives[j].size, auxToken.toString(16).length)).padStart(2*architecture.directives[j].size, "0");
                if(auxTokenString.length > 2*architecture.directives[j].size){
                 	ret.status = "error" ;
					        ret.errorcode = 18;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }
                auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
              }

              if(data_compiler(auxTokenString, architecture.directives[j].size, label, parseInt(auxTokenString, 16)) == -1){
                return -1;
              }

              label = null;

              console_log(memory[memory_hash[0]]);
              console_log("double word Terminado");

              next_token();
              token = get_token();

              console_log(token);

              for(var z = 0; z < architecture.directives.length; z++){
                if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                  isDoubleWord = false;
                }
              }
              console_log(memory[memory_hash[0]]);
            }

            j=0;

            break;
          case "float":
            var isFloat = true;

            next_token();

            while(isFloat){
              console_log("float");

              token = get_token();

              if(token == null){
                ret.status = "error" ;
				        ret.errorcode = 23;
				        ret.token = token;
				        ret.tokenIndex = tokenIndex;
                return ret;
              }

              re = new RegExp("([0-9A-Fa-f-]),([0-9A-Fa-f-])");
              if(token.search(re) != -1){
                ret.status = "error" ;
				        ret.errorcode = 24;
				        ret.token = token;
				        ret.tokenIndex = tokenIndex;
                return ret;
              }

              re = new RegExp(",", "g");
              token = token.replace(re, "");

              console_log(token);

              var auxToken;
              var auxTokenString;
              if(token.match(/^0x/)){
                var value = token.split('x');

                re = new RegExp("[0-9A-Fa-f]{"+value[1].length+"}","g");
                if(value[1].search(re) == -1){
                  ret.status = "error" ;
					        ret.errorcode = 16;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }

                auxTokenString = value[1].padStart(2*architecture.directives[j].size, "0");
                if(value[1].length == 0){
                  ret.status = "error" ;
					        ret.errorcode = 19;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }
                if(auxTokenString.length > 2*architecture.directives[j].size){
                  ret.status = "error" ;
					        ret.errorcode = 18;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }
                auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
              }
              else{
                var re = new RegExp("[\+e0-9.-]{"+token.length+"}","g");
                if(token.search(re) == -1){
                  ret.status = "error" ;
					        ret.errorcode = 16;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }
                auxToken = parseFloat(token, 10);
                auxTokenString = (bin2hex(float2bin(auxToken))).padStart(2*architecture.directives[j].size, "0");
                if(auxTokenString.length > 2*architecture.directives[j].size){
                  ret.status = "error" ;
					        ret.errorcode = 18;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }
                auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
              }

              console_log(auxTokenString);

              if(data_compiler(auxTokenString, architecture.directives[j].size, label, token) == -1){
                return -1;
              }

              label = null;

              console_log(memory[memory_hash[0]]);
              console_log("float Terminado");

              next_token();
              token = get_token();

              console_log(token);

              for(var z = 0; z < architecture.directives.length; z++){
                if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                  isFloat = false;
                }
              }
              console_log(memory[memory_hash[0]]);
            }

            j=0;

            break;
          case "double":
            var isDouble = true;

            next_token();

            while(isDouble){
              console_log("double");

              token = get_token();

              if(token == null){
                ret.status = "error" ;
				        ret.errorcode = 23;
				        ret.token = "";
				        ret.tokenIndex = tokenIndex;

				        return ret;
              }

              re = new RegExp("([0-9A-Fa-f-]),([0-9A-Fa-f-])");
              if(token.search(re) != -1){
                ret.status = "error" ;
				        ret.errorcode = 24;
				        ret.token = token;
				        ret.tokenIndex = tokenIndex;

				        return ret;
              }

              re = new RegExp(",", "g")
              token = token.replace(re, "");

              console_log(token);

              var auxToken;
              var auxTokenString;
              if(token.match(/^0x/)){
                var value = token.split('x');

                re = new RegExp("[0-9A-Fa-f]{"+value[1].length+"}","g");
                if(value[1].search(re) == -1){
                  ret.status = "error" ;
					        ret.errorcode = 16;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }

                auxTokenString = value[1].padStart(2*architecture.directives[j].size, "0");
                if(value[1].length == 0){
                  ret.status = "error" ;
					        ret.errorcode = 19;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }
                if(auxTokenString.length > 2*architecture.directives[j].size){
                  ret.status = "error" ;
					        ret.errorcode = 18;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }
                auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
              }
              else{
                var re = new RegExp("[\+e0-9.-]{"+token.length+"}","g");
                if(token.search(re) == -1){
                  ret.status = "error" ;
					        ret.errorcode = 16;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }
                auxToken = parseFloat(token, 10);console_log(auxTokenString);
                auxTokenString = (bin2hex(double2bin(auxToken))).padStart(2*architecture.directives[j].size, "0");
                if(auxTokenString.length > 2*architecture.directives[j].size){
                  ret.status = "error" ;
					        ret.errorcode = 18;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }
                auxTokenString = auxTokenString.substring(auxTokenString.length-(2*architecture.directives[j].size), auxTokenString.length);
              }

              console_log(auxTokenString);

              if(data_compiler(auxTokenString, architecture.directives[j].size, label, token) == -1){
                return -1;
              }

              label = null;

              console_log(memory[memory_hash[0]]);
              console_log("double Terminado");

              next_token();
              token = get_token();

              console_log(token);

              for(var z = 0; z < architecture.directives.length; z++){
                if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                  isDouble = false;
                }
              }
              console_log(memory[memory_hash[0]]);
            }

            j=0;

            break;
          case "ascii_not_null_end":
            console_log("ascii_not_null_end");

            var isAscii = true;
            var nextToken = 1;

            next_token();

            while(isAscii){
              console_log("ascii_not_null_end");

              token = get_token();
              console_log(token);

              string = token;

              re = new RegExp('^"');
              string = string.replace(re, "");
              console_log(string);
              re = new RegExp('"$');
              string = string.replace(re, "");
              console_log(string);

              if(token == null){
                break;
              }

              /*re = new RegExp('(.)","(.)');
              if(token.search(re) != -1){
                this.compileError(24, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                $(".loading").hide();
                return -1;
              }

              console_log(token);

              re = new RegExp(",", "g");
              token = token.replace(re, "");

              re = new RegExp('^"');
              console_log(re);
              if(token.search(re) == -1){
                ret.status = "error" ;
					        ret.errorcode = 17;
					        ret.token = "";
					        ret.tokenIndex = tokenIndex;
	                return ret;
              }

              var string = "";
              var final = false;

              re = new RegExp('"$');
              console_log(re);
              console_log(token);
              if(token.search(re) == -1){
                string = token.substring(1, token.length);
              }
              else{
                string = token.substring(1, token.length-1);
                final = true;
              }

              while(final == false){
                next_token();
                token = get_token();
                console_log(token);

                if(token == null){
                  break;
                }

                re = new RegExp('(.)","(.)');
                console_log(re);
                if(token.search(re) != -1){
                  ret.status = "error" ;
					        ret.errorcode = 24;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }

                console_log(token);

                re = new RegExp(",", "g")
                token = token.replace(re, "");

                re = new RegExp('^"');
                console_log(re);
                if(token.search(re) != -1 && final == false){
                  string = string + " ";
                  final = true;
                }

                re = new RegExp('"$');
                console_log(re);
                if(token.search(re) != -1 && final == false){
                  final = true;
                  string = string + " " + token.substring(0, token.length-1);
                }

                if(final == false){
                  string = string + " " + token;
                  final = false;
                }
              }*/

              console_log(string);

              for(var i = 0; i < string.length; i++){
                console_log(string.length);
                if((data_address % align) != 0 && i == 0 && align != 0){
                  while((data_address % align) != 0){
                    if(data_address % 4 == 0){
                      memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: null, DefValue: null, reset: false});
                      (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
                      data_address++;
                    }
                    else if(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length == 4){
                      data_address++;
                    }
                    else{
                      (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
                      data_address++;
                    }
                  }
                }

                if(data_address % 4 == 0){
                  memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: string.charAt(i), DefValue: string.charAt(i), reset: false});

                  if(i == 0){
                    (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Bin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Tag: label},);
                    if(label != null){
                      data_tag.push({tag: label, addr: data_address});
                    }
                    label = null;
                  }
                  else{
                    (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Bin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Tag: null},);
                  }

                  data_address++;

                }
                else{
                  if(i == 0){
                    (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Bin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Tag: label},);
                    memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value = string.charAt(i) + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value;
                    memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue = string.charAt(i) + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue;
                    if(label != null){
                      data_tag.push({tag: label, addr: data_address});
                    }
                    label = null;
                  }
                  else{
                    (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Bin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Tag: null},);
                    memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value = string.charAt(i) + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value;
                    memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue = string.charAt(i) + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue;
                  }
                  data_address++;
                }
              }
              console_log(memory[memory_hash[0]]);

              if(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length < 4){
                var num_iter = 4 - memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length;
                for(var i = 0; i < num_iter; i++){
                  (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address + (i)), DefBin: "00", Bin: "00", Tag: null},);
                }
              }

              console_log("ascii_not_null_end Terminado");

              if(nextToken == 1){
                next_token();
                token = get_token();
              }

              nextToken = 1;

              console_log(token);

              for(var z = 0; z < architecture.directives.length; z++){
                if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                  isAscii = false;
                }
              }
              console_log(memory[memory_hash[0]]);
            }

            j=0;

            break;
          case "ascii_null_end":
            console_log("ascii_null_end");

            var isAscii = true;
            var nextToken = 1;

            next_token();

            while(isAscii){
              console_log("ascii_null_end")

              token = get_token();
              console_log(token);

              if(token == null){
                break;
              }

              string = token;

              re = new RegExp('^"');
              string = string.replace(re, "");
              console_log(string);
              re = new RegExp('"$');
              string = string.replace(re, "");
              console_log(string);

              /*re = new RegExp('(.)","(.)');
              if(token.search(re) != -1){
                this.compileError(24, token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
                $(".loading").hide();
                return -1;
              }

              re = new RegExp(",", "g")
              token = token.replace(re, "");

              re = new RegExp('^"');
              console_log(re)
              if(token.search(re) == -1){
                ret.status = "error" ;
					        ret.errorcode = 17;
					        ret.token = "";
					        ret.tokenIndex = tokenIndex;
	                return ret;
              }

              var string = "";
              var final = false;

              re = new RegExp('"$');
              console_log(re);
              console_log(token);
              if(token.search(re) == -1){
                string = token.substring(1, token.length);
              }
              else{
                string = token.substring(1, token.length-1);
                final = true;
              }

              while(final == false){
                next_token();
                token = get_token();
                console_log(token);
                if(token == null){
                  break;
                }

                re = new RegExp('(.)","(.)');
                console_log(re);
                if(token.search(re) != -1){
                  ret.status = "error" ;
					        ret.errorcode = 24;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
                }

                re = new RegExp(",", "g")
                token = token.replace(re, "");

                re = new RegExp('^"');
                console_log(re);
                if(token.search(re) != -1 && final == false){
                  string = string + " ";
                  final = true;
                }

                re = new RegExp('"$');
                console_log(re);
                if(token.search(re) != -1 && final == false){
                  final = true;
                  string = string + " " + token.substring(0, token.length-1);
                }

                if(final == false){
                  string = string + " " + token;
                  final = false;
                }
              }

              string = string;*/

              console_log(string);

              for(var i = 0; i < string.length + 1; i++){
                console_log(string.length);
                if((data_address % align) != 0 && i == 0 && align != 0){
                  while((data_address % align) != 0){
                    if(data_address % 4 == 0){
                      memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: null, DefValue: null, reset: false});
                      (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
                      data_address++;
                    }
                    else if(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length == 4){
                      data_address++;
                    }
                    else{
                      (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
                      data_address++;
                    }
                  }
                }

                if(data_address % 4 == 0){
                  memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: string.charAt(i), DefValue: string.charAt(i), reset: false});

                  if(i < string.length){
                    if(i == 0){
                      (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Bin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Tag: label},);
                      if(label != null){
                        data_tag.push({tag: label, addr: data_address});
                      }
                      label = null;
                    }
                    else{
                      (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Bin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Tag: null},);
                    }
                  }
                  else{
                    (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: "00", Bin: "00", Tag: null},);
                  }

                  data_address++;
                }
                else{
                  if(i < string.length){
                    if(i == 0){
                      (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Bin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Tag: label},);
                      memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value = string.charAt(i) + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value;
                      memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue = string.charAt(i) + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue;
                      if(label != null){
                        data_tag.push({tag: label, addr: data_address});
                      }
                      label = null;
                    }
                    else{
                      (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Bin: (string.charCodeAt(i).toString(16)).padStart(2, "0"), Tag: null},);
                      memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value = string.charAt(i) + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value;
                      memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue = string.charAt(i) + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue;
                    }
                  }
                  else{
                    (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: "00", Bin: "00", Tag: null},);
                  }

                  data_address++;
                }
              }

              console_log(memory[memory_hash[0]]);

              if(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length < 4){
                var num_iter = 4 - memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length;
                for(var i = 0; i < num_iter; i++){
                  (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address + (i)), DefBin: "00", Bin: "00", Tag: null},);
                }
              }

              console_log("ascii_null_end Terminado");

              if(nextToken == 1){
                next_token();
                token = get_token();
              }

              nextToken = 1;

              console_log(token);

              for(var z = 0; z < architecture.directives.length; z++){
                if(token == architecture.directives[z].name || token == null || token.search(/\:$/) != -1){
                  isAscii = false;
                }
              }
              console_log(memory[memory_hash[0]]);
            }

            j=0;

            break;
          case "space":
            console_log("space");

            var string = "";

            next_token();
            token = get_token();
            console_log(token);
            console_log(label);

            if(token == null){
              ret.status = "error" ;
			        ret.errorcode = 23;
			        ret.token = "";
			        ret.tokenIndex = tokenIndex;
              return ret;
            }

            var re = new RegExp("[0-9-]{"+token.length+"}","g");
            if(token.search(re) == -1){
              ret.status = "error" ;
					        ret.errorcode = 16;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
            }

            if(parseInt(token) < 0){
              ret.status = "error" ;
					        ret.errorcode = 22;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
            }

            var auxToken = parseInt(token) * architecture.directives[j].size;

            for(var i = 0; i < auxToken; i++){
              if((data_address % align) != 0 && i == 0 && align != 0){
                while((data_address % align) != 0){
                  if(data_address % 4 == 0){
                    memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: null, DefValue: null, reset: false});
                    (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
                    data_address++;
                  }
                  else if(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length == 4){
                    data_address++;
                  }
                  else{
                    (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
                    data_address++;
                  }
                }
              }

              if(data_address % 4 == 0){
                memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: string, DefValue: "", reset: false});

                if(i == 0){
                  (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: "00", Bin: "00", Tag: label},);
                  if(label != null){
                    data_tag.push({tag: label, addr: data_address});
                  }
                  label = null;
                }
                else{
                  (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: "00", Bin: "00", Tag: null},);
                }

                data_address++;
              }
              else{
                if(i == 0){
                  (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: "00", Bin: "00", Tag: label},);
                  if(label != null){
                    data_tag.push({tag: label, addr: data_address});
                  }
                  label = null;
                }
                else{
                  (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: "00", Bin: "00", Tag: null},);
                }

                data_address++;
              }
            }

            console_log(memory[memory_hash[0]]);

            if(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length < 4){
              var num_iter = 4 - memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length;
              for(var i = 0; i < num_iter; i++){
                (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address + (i)), DefBin: "00", Bin: "00", Tag: null},);
              }
            }

            next_token();
            token = get_token();

            console_log("space Terminado");

            break;
          case "align":
            console_log("align");

            next_token();
            token = get_token();
            console_log(token);

            if(token == null){
              ret.status = "error" ;
					        ret.errorcode = 23;
					        ret.token = "";
					        ret.tokenIndex = tokenIndex;
	                return ret;
            }

            var re = new RegExp("[0-9-]{"+token.length+"}","g");
            if(token.search(re) == -1){
              ret.status = "error" ;
					        ret.errorcode = 16;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
            }

            if(parseInt(token) < 0){
              ret.status = "error" ;
					        ret.errorcode = 22;
					        ret.token = token;
					        ret.tokenIndex = tokenIndex;
	                return ret;
            }

            console_log(align);
            align = Math.pow(2, parseInt(token));
            console_log(align);

            next_token();
            token = get_token();

            console_log("align Terminado");

            break;
          default:
            console_log("Default");
            existsData = false;
            break;
        }
      }

      else if(j== architecture.directives.length-1 && token != architecture.directives[j].name && token != null && token.search(/\:$/) == -1){
        //app._data.memory[memory_hash[0]] = memory[memory_hash[0]];
        return;
      }

    }
  }
  //app._data.memory[memory_hash[0]] = memory[memory_hash[0]];
  return 0;
}
/*Stores a data in data memory*/
function data_compiler(value, size, dataLabel, DefValue){
  for(var i = 0; i < (value.length/2); i++){
    if((data_address % align) != 0 && i == 0 && align != 0){
      while((data_address % align) != 0){
        if(data_address % 4 == 0){
          memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: null, DefValue: null, reset: false});
          (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
          data_address++;
        }
        else if(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length == 4){
          data_address++;
        }
        else{
          (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
          data_address++;
        }
      }
    }

    if(data_address % size != 0 && i == 0){
      ret.status = "error" ;
					        ret.errorcode = 21;
					        ret.token = "";
					        ret.tokenIndex = tokenIndex;
	                return ret;
    }

    if(data_address % 4 == 0){
      console_log(DefValue);
      memory[memory_hash[0]].push({Address: data_address, Binary: [], Value: DefValue, DefValue: DefValue, reset: false});

      if(i == 0){
        (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Bin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Tag: dataLabel},);
        if(dataLabel != null){
          data_tag.push({tag: dataLabel, addr: data_address});
        }
        dataLabel = null;
      }
      else{
        (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address), DefBin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Bin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Tag: null},);
      }

      data_address++;
    }
    else{
      if(value.length <= 4 && i == 0){
        console_log(DefValue);
        memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value = DefValue + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].Value;
        memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue = DefValue + " " + memory[memory_hash[0]][memory[memory_hash[0]].length-1].DefValue;
      }

      if(i == 0){
        (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Bin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Tag: dataLabel},);
        if(dataLabel != null){
          data_tag.push({tag: dataLabel, addr: data_address});
        }
        dataLabel = null;
      }
      else{
        (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).splice(data_address%4, 1, {Addr: (data_address), DefBin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Bin: value.substring(value.length-(2+(2*i)), value.length-(2*i)), Tag: null},);
        console_log(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary[data_address%4]);
      }
      data_address++;
    }
  }
  console_log(memory[memory_hash[0]])

  if(memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length < 4){
    var num_iter = 4 - memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary.length;
    for(var i = 0; i < num_iter; i++){
      (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: (data_address + i), DefBin: "00", Bin: "00", Tag: null},);
      console_log("padding");
    }
  }
}
/*Compile text segment*/
function code_segment_compiler(){
  var existsInstruction = true;

  next_token();
  var instInit = tokenIndex;

  while(existsInstruction){
    token = get_token();

    for(var i = 0; i < architecture.directives.length; i++){
      if(token == architecture.directives[i].name && architecture.directives[i].action == "global_symbol"){
        next_token(); // .globl *main*
        next_token();
        token = get_token();
      }
      else if(token == architecture.directives[i].name){
        //app._data.instructions = instructions;
        console_log(token);
        for(var i = 0; i < instructions.length; i++){
          if(instructions[i].Label != ""){
            instructions_tag.push({tag: instructions[i].Label, addr: parseInt(instructions[i].Address, 16)});
          }
        }

        return 0;
      }
    }

    var label = "";
    var validTagPC = true;

    if(token == null){
      break;
    }

    console_log(token);

    var found = false;
    var end = false;

    if(token.search(/\:$/) != -1){
      if(token.length == 1){
        ret.status = "error" ;
					        ret.errorcode = 0;
					        ret.token = "";
					        ret.tokenIndex = tokenIndex;
	                return ret;
      }

      for(var i = 0; i < memory[memory_hash[0]].length; i++){
        for(var j = 0; j < memory[memory_hash[0]][i].Binary.length; j++){
          if(memory[memory_hash[0]][i].Binary[j].Tag == token.substring(0,token.length-1)){
            ret.status = "error" ;
					        ret.errorcode = 1;
					        ret.token = token.substring(0,token.length-1);
					        ret.tokenIndex = tokenIndex;
	                return ret;
          }
        }
      }

      for(var i = 0; i < instructions.length; i++){
        if(instructions[i].Label == token.substring(0,token.length-1)){
          ret.status = "error" ;
					        ret.errorcode = 1;
					        ret.token = token.substring(0,token.length-1);
					        ret.tokenIndex = tokenIndex;
	                return ret;
        }
      }

      label = token.substring(0,token.length-1);
      next_token();
      instInit = tokenIndex;
      token = get_token();

      if(token != null){
        var re = new RegExp(",+$");
        token = token.replace(re, "");
      }
      else{
        var instIndex;
        for (var i = 0; i < architecture.instructions.length; i++) {
          if(architecture.instructions[i].name == "nop"){
            instIndex = i;
          }
        }
        instruction_compiler("nop", "nop", label, 1, false, 0, instInit, instIndex, false);
        end = true;
        found = true;
      }
    }

    var re = new RegExp(",+$");

    if(token != null){
      token = token.replace(re, "");
      console_log(token)
      var stopFor = false;
    }


    for(var i = 0; i < architecture.instructions.length && stopFor == false && end == false; i++){
      if(architecture.instructions[i].name != token){
        continue;
      }

      else{
        var instruction = "";
        var userInstruction = "";

        var numFields = 0;
        found = true;

        for (var j = 0; j < architecture.instructions[i].fields.length; j++){
          if(architecture.instructions[i].fields[j].type != "cop"){
            numFields++;
          }
        }
        console_log(numFields);

        instruction = instruction + token;
        userInstruction = userInstruction + token;

        //var new_ins = 0;

        for (var j = 0; j < numFields - 1; j++){
          next_token();
          token = get_token();
          console_log(token);

          if(token != null){
            var re = new RegExp(",+$");
            token = token.replace(re, "");
            /*for(var a = 0; a < architecture.instructions.length; a++){
              if(architecture.instructions[a].name == token){
                new_ins = 1;
              }
            }
            if(new_ins == 0){
              instruction = instruction + " " + token;
              userInstruction = userInstruction + " " + token;
            }*/
            instruction = instruction + " " + token;
            userInstruction = userInstruction + " " + token;
          }

          /*if(new_ins == 1){
            break;
          }*/
        }

        console_log(instruction);
        console_log(label);

        var result = instruction_compiler(instruction, userInstruction, label, tokenIndex, false, 0, instInit, i, false);

        if(result == -1){
          $(".loading").hide();
          return -1;
        }

        /*if (new_ins == 0){
          next_token();
        }
        new_ins = 0;*/
        next_token();
        instInit = tokenIndex; //PRUEBA
        stopFor = true;
      }
    }

    if(!found){
      var resultPseudo = -3;
      var instruction = "";
      var numToken = 0;
      var exists = false;
      var inst = token;

      console_log(token)

      for (var i = 0; i < architecture.pseudoinstructions.length && exists == false; i++){
        if(architecture.pseudoinstructions[i].name == token){
          numToken = architecture.pseudoinstructions[i].fields.length;
          console_log(numToken)
          exists = true;
          instruction = instruction + token;

          for (var i = 0; i < numToken; i++){
            next_token();
            token = get_token();

            if(token != null){
              var re = new RegExp(",+$");
              token = token.replace(re, "");
            }

            instruction = instruction + " " + token;
          }
          resultPseudo = pseudoinstruction_compiler(instruction, label, tokenIndex);
          console_log(resultPseudo);
        }
      }

      if(resultPseudo == -3){

        existsInstruction = false;
        tokenIndex = 0;
        instructions = [];
        pending_instructions = [];
        pending_tags = [];
        memory[memory_hash[0]] = [];
        data_tag = [];
        instructions_binary = [];
        memory[memory_hash[1]] = [];
        extern = [];
        memory[memory_hash[2]] = [];
        data = [];
        memory[memory_hash[1]] = memory[memory_hash[1]];
        memory[memory_hash[2]] = memory[memory_hash[2]];

				ret.status = "error" ;
        ret.errorcode = 2;
        ret.token = token;
        ret.tokenIndex = tokenIndex;

        return ret;
      }

      if(resultPseudo == -2){
        //this.compileError(2, token, textarea_assembly_editor.posFromIndex(tokenIndex).line); //PRUEBA para dar error con mas detalle

        existsInstruction = false;
        tokenIndex = 0;
        instructions = [];
        pending_instructions = [];
        pending_tags = [];
        memory[memory_hash[0]] = [];
        data_tag = [];
        instructions_binary = [];
        memory[memory_hash[1]] = [];
        extern = [];
        memory[memory_hash[2]] = [];
        data = [];

        memory[memory_hash[1]] = memory[memory_hash[1]];
        memory[memory_hash[2]] = memory[memory_hash[2]];

        return -1;
      }

      if(resultPseudo == -1){
        existsInstruction = false;
        tokenIndex = 0;
        instructions = [];
        pending_instructions = [];
        pending_tags = [];
        memory[memory_hash[0]] = [];
        data_tag = [];
        instructions_binary = [];
        memory[memory_hash[1]] = [];
        extern = [];
        memory[memory_hash[2]] = [];
        data = [];

        memory[memory_hash[1]] = memory[memory_hash[1]];
        memory[memory_hash[2]] = memory[memory_hash[2]];

        ret.status = "error" ;
        ret.errorcode = 25;
        ret.token = "";
        ret.tokenIndex = tokenIndex;

        return ret;
      }

      next_token();
      instInit = tokenIndex; //PRUEBA

    }
  }

  token = get_token();
  console_log(token);

  //app._data.instructions = instructions;

  for(var i = 0; i < instructions.length; i++){
    if(instructions[i].Label != ""){
      instructions_tag.push({tag: instructions[i].Label, addr: parseInt(instructions[i].Address, 16)});
    }
  }

  return 0;
}
/*Compile pseudoinstructions*/
function pseudoinstruction_compiler(instruction, label, line){
  var re = /\' \'/;
  instruction = instruction.replace(re, "'\0'");
  var re = /\'\\n\'/;
  instruction = instruction.replace(re, "10");
  console_log(instruction);
  var re = /\'\\t\'/;
  instruction = instruction.replace(re, "9");
  console_log(instruction);

  var instructionParts = instruction.split(' ');
  var found = false;

  var re = /\'\0\'/;
  instruction = instruction.replace(re, "' '");
  console_log(instruction);


  for (var i = 0; i < instructionParts.length; i++) {
    instructionParts[i] = instructionParts[i].replace(re, "' '");
  }

  console_log(instructionParts);

  for (var i = 0; i < architecture.pseudoinstructions.length; i++){
    console_log(architecture.pseudoinstructions[i].name);
    if(architecture.pseudoinstructions[i].name != instructionParts[0]){
      continue;
    }

    else{
      found = true;

      var signatureDef = architecture.pseudoinstructions[i].signature_definition;
      signatureDef = signatureDef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      re = new RegExp("[fF][0-9]+", "g");
      signatureDef = signatureDef.replace(re, "(.*?)");


      var signatureParts = architecture.pseudoinstructions[i].signature.split(',');
      var signatureRawParts = architecture.pseudoinstructions[i].signatureRaw.split(' ');
      var definition = architecture.pseudoinstructions[i].definition;

      console_log(signatureDef);
      console_log(instruction);
      console_log(instructionParts);

      if(instructionParts.length < (architecture.pseudoinstructions[i].fields.length + 1)){
        for (var j = 0; j < ((architecture.pseudoinstructions[i].fields.length + 1)-instructionParts.length ); j++){
          next_token();
          token = get_token();

          console_log(token);

          if(token != null){
            var re = new RegExp(",+$");
            token = token.replace(re, "");
          }

          instruction = instruction + " " + token;
        }

        instructionParts = instruction.split(' ');
      }

      console_log(instruction);

      re = new RegExp(signatureDef+"$");
      console_log(re)
      if(instruction.search(re) == -1 && i == architecture.pseudoinstructions.length-1){
        return -1;
      }

      if(instruction.search(re) == -1 && i < architecture.pseudoinstructions.length-1){
        found = false;
      }

      if(found == true){
        re = /aliasDouble\((.*)\)/;
        for(var a = 0; a < architecture.pseudoinstructions[i].fields.length && definition.search(re) != -1; a++){
          re = new RegExp(architecture.pseudoinstructions[i].fields[a].name,"g");
          console_log(instructionParts[a+1]);
          instructionParts[a+1] = instructionParts[a+1].replace("$","");
          definition = definition.replace(re, instructionParts[a+1]);
        }

        /*Replace DFP of SPF*/
        re = /aliasDouble\((.*)\)/;
        console_log(re);
        while (definition.search(re) != -1){
          var match = re.exec(definition);
          var args = match[1].split(";");
          var aux = "";

          for(var b = 0; b < architecture.components[3].elements.length; b++){
            console_log(architecture.components[3].elements[b].name);
            if(architecture.components[3].elements[b].name == args[0]){
              aux = architecture.components[3].elements[b].simple_reg[args[1]];
              console_log(aux);
              break;
            }
          }
          console_log(aux);

          definition = definition.replace(re, aux);
          console_log(definition);

        }

        for (var j = 1; j < signatureRawParts.length; j++){
          var aux = signatureRawParts[j].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          re = new RegExp(aux,"g");
          definition = definition.replace(re, instructionParts[j]);
        }

        re = new RegExp("\n","g");
        definition = definition.replace(re, "");

        console_log(definition);
        console_log(signatureParts);

        re = /Field.(\d).\((.*?)\).(.*?)[=<>;\s]/;
        while (definition.search(re) != -1){
          var match = re.exec(definition);
          console_log(match);

          var code;

          if(instructionParts[match[1]].match(/^\'(.*?)\'$/)){
            var re = /^\'(.*?)\'$/;
            console_log(re);
            var match2 = re.exec(instructionParts[match[1]]);
            console_log(match2);
            var asciiCode = match2[1].charCodeAt(0);
            console_log(asciiCode);
            console_log("value = field('" + asciiCode +"', '(" + match[2] + ")', '" + match[3] + "')");
            code = "value = field('" + asciiCode +"', '(" + match[2] + ")', '" + match[3] + "')";
          }
          else{
            console_log("value = field('" + instructionParts[match[1]] +"', '(" + match[2] + ")', '" + match[3] + "')");
            code = "value = field('" + instructionParts[match[1]] +"', '(" + match[2] + ")', '" + match[3] + "')";
          }

          var value;
          try{
            //eval("value = field('" + instructionParts[match[1]] +"', '(" + match[2] + ")', '" + match[3] + "')");
            eval(code);
          }
          catch(e){
            if (e instanceof SyntaxError){
              return -1;
            }
          }

          if(value == -1){
            return -1;
          }

          definition = definition.replace("Field." + match[1] + ".(" + match[2]+ ")." + match[3], value);

          re = /Field.(\d).\((.*?)\).(.*?)[;\s]/;
        }


        re = /Field.(\d).SIZE[=<>;\s]/g;
        if (definition.search(re) != -1){
          var match = re.exec(definition);
          console_log(match);

          var code;

          if(instructionParts[match[1]].match(/^\'(.*?)\'$/)){
            var re = /^\'(.*?)\'$/;
            console_log(re);
            var match2 = re.exec(instructionParts[match[1]]);
            console_log(match2);
            var asciiCode = match2[1].charCodeAt(0);
            console_log(asciiCode);
            console_log("value = field('" + asciiCode +"', 'SIZE', null)");
            code = "value = field('" + asciiCode +"', 'SIZE', null)";
          }
          else{
            console_log("value = field('" + instructionParts[match[1]] +"', 'SIZE', null)");
            code = "value = field('" + instructionParts[match[1]] +"', 'SIZE', null)";
          }

          var value;
          try{
            //eval("value = field('" + instructionParts[match[1]] +"', 'SIZE', null)");
            eval(code);
          }
          catch(e){
            if (e instanceof SyntaxError){
              return -1;
            }
          }

          if(value == -1){
            return -1;
          }

          console_log(value);
          console_log("Field." + match[1] + ".SIZE");

          definition = definition.replace("Field." + match[1] + ".SIZE", value);
        }

        console_log(definition);

        while(definition.match(/\'(.*?)\'/)){
          var re = /\'(.*?)\'/;
          console_log(re);
          var match2 = re.exec(instructionParts[match[1]]);
          console_log(match2);
          var asciiCode = match2[1].charCodeAt(0);
          console_log(asciiCode);
          definition = definition.replace(re, asciiCode)
        }

        console_log(definition);

        console_log(instruction);
        var re = new RegExp("'","g");
        instruction = instruction.replace(re, '"');
        console_log(instruction);

        var re = /{([^}]*)}/g;
        var code = re.exec(definition);

        if(code != null){
          while(code != null){
            var instructions = code[1].split(";");
            console_log(instructions);

            for (var j = 0; j < instructions.length-1; j++){
              var aux;
              if(j == 0){
                aux = "if(instruction_compiler('" + instructions[j] + "','" + instruction + "','" + label + "'," + line + ", false, 0, null, null, true) == -1){error = true}";
              }
              else{
                aux = "if(instruction_compiler('" + instructions[j] + "','', ''," + line + ", false, 0, null, null, true) == -1){error = true}";
              }
              definition = definition.replace(instructions[j]+";", aux+";\n");
            }
            code = re.exec(definition);
          }
        }
        else{
          var instructions = definition.split(";");

          for (var j = 0; j < instructions.length-1; j++){
            var aux;
            if(j == 0){
              aux = "if(instruction_compiler('" + instructions[j] + "','" + instruction + "','" + label + "'," + line + ", false, 0, null, null, true) == -1){error = true}";
            }
            else{
              aux = "if(instruction_compiler('" + instructions[j] + "','', ''," + line + ", false, 0, null, null, true) == -1){error = true}";
            }
            definition = definition.replace(instructions[j]+";", aux+";\n");
          }
        }

        console_log(definition);

        try{
          var error = false;
          console_log(definition);
          eval(definition);
          if(error == true){
            console_log("Error pseudo");
            return -2;
          }
          console_log("fin pseudo");
          return 0;
        }
        catch(e){
          if (e instanceof SyntaxError) {
            console_log("ASDFGHJ")
            return -2;
          }
        }
      }

    }
  }

  if(!found){
    return -1;
  }
}
/*Get pseudoinstruction fields*/
function field(field, action, type){
  console_log(field);
  console_log(action);
  console_log(type);

  if(action == "SIZE"){
    console_log("SIZE");

    if(field.match(/^0x/)){
      var value = field.split("x");
      return value[1].length*4;
    }
    else if (field.match(/^(\d)+\.(\d)+/)){
      return float2bin(parseFloat(field)).length;
    }
    else {
      var numAux = parseInt(field, 10);
      return (numAux.toString(2)).length;
    }
  }

  re = /\((.*?)\)/;
  if (action.search(re) != -1){
    var match = re.exec(action);
    var bits = match[1].split(",");
    var startBit = parseInt(bits[0]);
    var endBit = parseInt(bits[1]);

    if(field.match(/^0x/) && (type == "int" || type == "float")){
      var binNum = (parseInt(field, 16).toString(2));
      binNum = binNum.padStart(32, '0');
      binNum = binNum.substring(31-startBit, 32-endBit);
      var hexNum = "0x" + bin2hex(binNum);
      return hexNum;
    }
    else if(field.match(/^0x/) && (type == "double")){
      var binNum = double2bin(hex2double(field));
      binNum = binNum.padStart(64, '0');
      binNum = binNum.substring(63-startBit, 64-endBit);
      var hexNum = "0x" + bin2hex(binNum);
      return hexNum;
    }
    else if(type == "int"){
      var binNum = (parseInt(field, 10) >>> 0).toString(2);
      binNum = binNum.padStart(32, '0');
      binNum = binNum.substring(31-startBit, 32-endBit);
      var hexNum = "0x" + bin2hex(binNum);
      return hexNum;
    }
    else if (type == "float"){
      var binNum = float2bin(parseFloat(field));
      console_log(binNum);
      binNum = binNum.padStart(32, '0');
      binNum = binNum.substring(31-startBit, 32-endBit);
      var hexNum = "0x" + bin2hex(binNum);
      return hexNum;
    }
    else if (type == "double"){
      var binNum = double2bin(parseFloat(field));
      console_log(binNum);
      binNum = binNum.padStart(64, '0');
      binNum = binNum.substring(63-startBit, 64-endBit);
      var hexNum = "0x" + bin2hex(binNum);
      return hexNum;
    }

  }
  return -1;
}
/*Compile instruction*/
function instruction_compiler(instruction, userInstruction, label, line, pending, pendingAddress, instInit, instIndex, isPseudo){
  if(instIndex == null){
    instIndex = 0;
  }
  console_log(instruction);
  console_log(instIndex);
  var re = new RegExp("^ +");
  var oriInstruction = instruction.replace(re, "");

  re = new RegExp(" +", "g");
  oriInstruction = oriInstruction.replace(re, " ");

  var instructionParts = oriInstruction.split(' ');
  var validTagPC = true;
  var startBit;
  var stopBit;
  var resultPseudo = -3;

  console_log(label);
  console_log(line);

  var stopFor = false;

  for(var i = instIndex; i < architecture.instructions.length && stopFor == false; i++){
    if(architecture.instructions[i].name != instructionParts[0]){
      continue;
    }
    else{
      var auxSignature = architecture.instructions[i].signatureRaw;

      var tag = "";

      var binary = "";
      binary = binary.padStart(architecture.instructions[i].nwords * 32, "0");

      var instruction = architecture.instructions[i].signature_definition;
      var userInstruction = userInstruction;

      var signatureDef = architecture.instructions[i].signature_definition;
      signatureDef = signatureDef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      re = new RegExp("[fF][0-9]+", "g");
      signatureDef = signatureDef.replace(re, "(.*?)");

      re = new RegExp(",", "g");
      var signature = architecture.instructions[i].signature.replace(re, " ");

      re = new RegExp(signatureDef+"$");
      var match = re.exec(signature);
      var signatureParts = [];
      for(var j = 1; j < match.length; j++){
        signatureParts.push(match[j]);
      }

      match = re.exec(architecture.instructions[i].signatureRaw);
      var signatureRawParts = [];
      for(var j = 1; j < match.length; j++){
        signatureRawParts.push(match[j]);
      }

      console_log(signatureParts);
      console_log(signatureRawParts);

      re = new RegExp(signatureDef+"$");
      if(oriInstruction.search(re) == -1){

        if(isPseudo == false){
          console_log(get_token())

          tokenIndex =  instInit;
          token = get_token();

          console_log(token);
        }
        else{
          token = instructionParts[0];
        }

        var resultPseudo = null;
        var instruction = "";
        var numToken = 0;

        console_log(token)

        for(var i = i + 1; i < architecture.instructions.length; i++){
          if(architecture.instructions[i].name == token){

            var index = i;
            numToken = architecture.instructions[i].fields.length;
            instruction = instruction + token;

            for (var a = 1; a < numToken; a++){
              if(architecture.instructions[i].fields[a].type != "cop"){
                if(isPseudo == false){
                  next_token();
                  token = get_token();

                  if(token != null){
                    var re = new RegExp(",+$");
                    token = token.replace(re, "");
                  }
                }
                else{
                  token = instructionParts[a];
                }

                instruction = instruction + " " + token;
                console_log(instruction);
              }
            }
            if(isPseudo == false){
              instruction_compiler(instruction, instruction, label, line, pending, pendingAddress, instInit, index, false);
            }
            else{
              instruction_compiler(instruction, userInstruction, label, line, pending, pendingAddress, instInit, index, false);
            }
            return;
          }
        }




        for (var i = 0; i < architecture.pseudoinstructions.length; i++){
          if(architecture.pseudoinstructions[i].name == token){
            numToken = architecture.pseudoinstructions[i].fields.length;

            instruction = instruction + token;

            for (var i = 0; i < numToken; i++){
              next_token();
              token = get_token();

              if(token != null){
                var re = new RegExp(",+$");
                token = token.replace(re, "");
              }

              instruction = instruction + " " + token;
            }
            console_log(instruction)
            resultPseudo = pseudoinstruction_compiler(instruction, label, tokenIndex);

            console_log(resultPseudo)

            if(resultPseudo == 0){
              return;
            }

            if(resultPseudo == -1){

              ret.status = "error" ;
			        ret.errorcode = 3;
			        ret.token = auxSignature;
			        ret.tokenIndex = tokenIndex;

			        return ret;
            }
          }
        }

        //var resultPseudo = pseudoinstruction_compiler(oriInstruction, label, textarea_assembly_editor.posFromIndex(tokenIndex).line);

        /*console_log(resultPseudo)

        if(resultPseudo == 0){
          return;
        }

        if(resultPseudo == -1){
          this.compileError(3, architecture.instructions[i].signatureRaw, textarea_assembly_editor.posFromIndex(tokenIndex).line);
          return -1;
        }*/
      }

      if(resultPseudo == null){
      	ret.status = "error" ;
        ret.errorcode = 3;
        ret.token = auxSignature;
        ret.tokenIndex = tokenIndex;

        return ret;
      }
      console_log(oriInstruction);
      match = re.exec(oriInstruction);
      instructionParts = [];
      if(match != null){
        for(var j = 1; j < match.length; j++){
          instructionParts.push(match[j]);
        }
      }
      else{
        return -2;
      }

      console_log(instructionParts);

      //PRUEBA
      re = new RegExp("[fF][0-9]+");
      while(instruction.search(re) != -1){
        re = new RegExp("[fF]([0-9]+)");
        var match = re.exec(instruction);
        re = new RegExp("[fF][0-9]+");
        instruction = instruction.replace(re, "Field"+match[1]);
      }


      for(var j = 0; j < signatureParts.length; j++){
        console_log(signatureParts[j]);
        switch(signatureParts[j]) {
          case "INT-Reg":
            token = instructionParts[j];

            console_log(token);

            var id = -1;
            re = new RegExp("[0-9]+");
            if(token.search(re) != -1){
              re = new RegExp("(.*?)$");
              match = re.exec(token);
              id = match[1];
            }

            var validReg = false;
            var regNum = 0;

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                for(var z = 0; z < architecture_hash.length; z++){
                  for(var w = 0; w < architecture.components[z].elements.length; w++){
                    if(token == architecture.components[z].elements[w].name && architecture.components[z].type == "integer"){
                      validReg = true;
                      regNum++;

                      fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
                      var reg = w;

                      if(reg.toString(2).length > fieldsLength){
                      	ret.status = "error" ;
								        ret.errorcode = 12;
								        ret.token = token;
								        ret.tokenIndex = tokenIndex;

								        return ret;
                      }

                      console_log(reg)
                      console_log((reg.toString(2)).padStart(fieldsLength, "0"))
                      console_log(binary)
                      console_log(binary.length)
                      console_log(architecture.instructions[i].fields[a].startbit + 1)
                      console_log(binary.length - (architecture.instructions[i].fields[a].startbit + 1))

                      binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + (reg.toString(2)).padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);

                      console_log(binary);

                      //re = RegExp("[fF][0-9]+");
                      re = RegExp("Field[0-9]+");
                      instruction = instruction.replace(re, token);
                    }
                    else if(id == regNum){
                      validReg = true;

                      fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
                      var reg = regNum;

                      if(reg.toString(2).length > fieldsLength){
                        ret.status = "error" ;
								        ret.errorcode = 12;
								        ret.token = token;
								        ret.tokenIndex = tokenIndex;

								        return ret;
                      }

                      binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + (reg.toString(2)).padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                      //re = RegExp("[fF][0-9]+");
                      re = RegExp("Field[0-9]+");
                      instruction = instruction.replace(re, token);
                    }
                    else if(z == architecture_hash.length-1 && w == architecture.components[z].elements.length-1 && validReg == false){
                      ret.status = "error" ;
							        ret.errorcode = 4;
							        ret.token = token;
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }
                    regNum++;
                  }
                }
              }
            }

            break;

          case "SFP-Reg":
            token = instructionParts[j];

            console_log(token);

            var validReg = false;
            var regNum = 0;

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                for(var z = 0; z < architecture_hash.length; z++){
                  for(var w = 0; w < architecture.components[z].elements.length; w++){
                    if(token == architecture.components[z].elements[w].name && architecture.components[z].type == "floating point" && architecture.components[z].double_precision == false){
                      validReg = true;
                      regNum++;

                      fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
                      var reg = regNum;

                      if(reg.toString(2).length > fieldsLength){
                        ret.status = "error" ;
								        ret.errorcode = 12;
								        ret.token = token;
								        ret.tokenIndex = tokenIndex;

								        return ret;
                      }

                      binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + (reg.toString(2)).padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                      //re = RegExp("[fF][0-9]+");
                      re = RegExp("Field[0-9]+");
                      console_log(instruction);
                      instruction = instruction.replace(re, token);
                      console_log(instruction);
                    }
                    else if(z == architecture_hash.length-1 && w == architecture.components[z].elements.length-1 && validReg == false){
                      ret.status = "error" ;
							        ret.errorcode = 4;
							        ret.token = token;
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }
                    if(architecture.components[z].type == "floating point" && architecture.components[z].double_precision == false){
                      regNum++;
                    }
                  }
                }
              }
            }

            break;

          case "DFP-Reg":
            token = instructionParts[j];

            console_log(token);

            var validReg = false;
            var regNum = 0;

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                for(var z = 0; z < architecture_hash.length; z++){
                  for(var w = 0; w < architecture.components[z].elements.length; w++){
                    if(token == architecture.components[z].elements[w].name && architecture.components[z].type == "floating point" && architecture.components[z].double_precision == true){
                      validReg = true;
                      regNum++;

                      fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
                      var reg = regNum;

                      if(reg.toString(2).length > fieldsLength){
                        ret.status = "error" ;
								        ret.errorcode = 12;
								        ret.token = token;
								        ret.tokenIndex = tokenIndex;

								        return ret;
                      }

                      binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + (reg.toString(2)).padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                      //re = RegExp("[fF][0-9]+");
                      re = RegExp("Field[0-9]+");
                      instruction = instruction.replace(re, token);
                    }
                    else if(z == architecture_hash.length-1 && w == architecture.components[z].elements.length-1 && validReg == false){
                      ret.status = "error" ;
							        ret.errorcode = 4;
							        ret.token = token;
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }
                    if(architecture.components[z].type == "floating point" && architecture.components[z].double_precision == true){
                      regNum++;
                    }
                  }
                }
              }
            }

            break;

          case "Ctrl-Reg":
            token = instructionParts[j];

            console_log(token)

            var validReg = false;
            var regNum = 0;

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                for(var z = 0; z < architecture_hash.length; z++){
                  for(var w = 0; w < architecture.components[z].elements.length; w++){
                    if(token == architecture.components[z].elements[w].name && architecture.components[z].type == "control"){
                      validReg = true;
                      regNum++;

                      fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;
                      var reg = regNum;

                      if(reg.toString(2).length > fieldsLength){
                        ret.status = "error" ;
								        ret.errorcode = 12;
								        ret.token = token;
								        ret.tokenIndex = tokenIndex;

								        return ret;
                      }

                      binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + (reg.toString(2)).padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                      //re = RegExp("[fF][0-9]+");
                      re = RegExp("Field[0-9]+");
                      instruction = instruction.replace(re, token);
                    }
                    else if(z == architecture_hash.length-1 && w == architecture.components[z].elements.length-1 && validReg == false){
                      ret.status = "error" ;
							        ret.errorcode = 4;
							        ret.token = token;
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }
                    if(architecture.components[z].type == "control"){
                      regNum++;
                    }
                  }
                }
              }
            }

            break;

          case "inm":
            token = instructionParts[j];
            var token_user = "";

            console_log(token);

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;

                var inm;

                if(token.match(/^0x/)){
                  var value = token.split("x");
                  if(value[1].length*4 > fieldsLength){
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    if(resultPseudo == -1){
                      ret.status = "error" ;
							        ret.errorcode = 5;
							        ret.token = token;
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }

                    if(resultPseudo == -2){
                      ret.status = "error" ;
							        ret.errorcode = 14;
							        ret.token = "";
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }

                  }

                  if(isNaN(parseInt(token, 16)) == true){
                    ret.status = "error" ;
						        ret.errorcode = 6;
						        ret.token = token;
						        ret.tokenIndex = tokenIndex;

						        return ret;
                  }

                  inm = (parseInt(token, 16)).toString(2);
                }
                else if (token.match(/^(\d)+\.(\d)+/)){
                  if(float2bin(parseFloat(token)).length > fieldsLength){
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    if(resultPseudo == -1){
                      ret.status = "error" ;
							        ret.errorcode = 5;
							        ret.token = token;
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }

                    if(resultPseudo == -2){
                      ret.status = "error" ;
							        ret.errorcode = 14;
							        ret.token = "";
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }
                  }

                  if(isNaN(parseFloat(token)) == true){
                    ret.status = "error" ;
						        ret.errorcode = 6;
						        ret.token = token;
						        ret.tokenIndex = tokenIndex;

						        return ret;
                  }

                  inm = float2bin(parseFloat(token, 16));
                }
                else if(token.match(/^\'(.*?)\'$/)){
                  var re = /^\'(.*?)\'$/;
                  console_log(re);
                  var match = re.exec(token);
                  console_log(match);
                  var asciiCode = match[1].charCodeAt(0);
                  console_log(asciiCode);

                  re = RegExp("Field[0-9]+");
                  instruction = instruction.replace(re, asciiCode);

                  inm = (asciiCode >>> 0).toString(2);
                }
                else if(isNaN(parseInt(token))){
                  validTagPC = false;
                  startBit = architecture.instructions[i].fields[a].startbit;
                  stopBit = architecture.instructions[i].fields[a].stopbit;
                }
                else {
                  var numAux = parseInt(token, 10) >>> 0;

                  if((numAux.toString(2)).length > fieldsLength){
                    console_log(oriInstruction)
                    console_log(label)
                    console_log(line)
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    if(resultPseudo == -1){
                      ret.status = "error" ;
							        ret.errorcode = 5;
							        ret.token = token;
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }

                    if(resultPseudo == -2){
                      ret.status = "error" ;
							        ret.errorcode = 14;
							        ret.token = "";
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }
                  }

                  if(isNaN(parseInt(token)) == true && resultPseudo == -3){
                    ret.status = "error" ;
						        ret.errorcode = 6;
						        ret.token = token;
						        ret.tokenIndex = tokenIndex;

						        return ret;
                  }

                  inm = (parseInt(token, 10) >>> 0).toString(2);
                }
                if(validTagPC == true){
                  console_log(inm.length);
                  if(inm.length > (architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1)){
                    ret.status = "error" ;
						        ret.errorcode = 12;
						        ret.token = token;
						        ret.tokenIndex = tokenIndex;

						        return ret;
                  }

                  binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + inm.padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                }

                //re = RegExp("[fF][0-9]+");
                re = RegExp("Field[0-9]+");
                instruction = instruction.replace(re, token);
              }
            }

            break;

          case "address":
            token = instructionParts[j];

            console_log(token)

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;

                if(token.match(/^0x/)){
                  var value = token.split("x");

                  if(value[1].length*4 > fieldsLength){
                    ret.status = "error" ;
						        ret.errorcode = 8;
						        ret.token = token;
						        ret.tokenIndex = tokenIndex;

						        return ret;
                  }

                  if(isNaN(parseInt(token, 16)) == true){
                    ret.status = "error" ;
						        ret.errorcode = 9;
						        ret.token = token;
						        ret.tokenIndex = tokenIndex;

						        return ret;
                  }

                  addr = (parseInt(token, 16)).toString(2);
                  binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + addr.padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                  //re = RegExp("[fF][0-9]+");
                  re = RegExp("Field[0-9]+");
                  instruction = instruction.replace(re, token);
                }
                else{
                  var validTag = false;
                  startBit = architecture.instructions[i].fields[a].startbit;
                  stopBit = architecture.instructions[i].fields[a].stopbit;
                }
              }
            }

            break;

          case "offset_bytes":
            token = instructionParts[j];
            var token_user = "";

            console_log(token);

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;

                var inm;

                if(token.match(/^0x/)){
                  var value = token.split("x");
                  if(value[1].length*4 > fieldsLength){
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    if(resultPseudo == -1){
                      ret.status = "error" ;
							        ret.errorcode = 5;
							        ret.token = token;
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }

                    if(resultPseudo == -2){
                      ret.status = "error" ;
							        ret.errorcode = 14;
							        ret.token = "";
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }

                  }

                  if(isNaN(parseInt(token, 16)) == true){
                    ret.status = "error" ;
							        ret.errorcode = 6;
							        ret.token = token;
							        ret.tokenIndex = tokenIndex;

							        return ret;
                  }

                  inm = (parseInt(token, 16)).toString(2);
                }
                else if (token.match(/^(\d)+\.(\d)+/)){
                  if(float2bin(parseFloat(token)).length > fieldsLength){
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    if(resultPseudo == -1){
                      ret.status = "error" ;
							        ret.errorcode = 5;
							        ret.token = token;
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }

                    if(resultPseudo == -2){
                      ret.status = "error" ;
							        ret.errorcode = 14;
							        ret.token = "";
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }
                  }

                  if(isNaN(parseFloat(token)) == true){
                    ret.status = "error" ;
						        ret.errorcode = 6;
						        ret.token = token;
						        ret.tokenIndex = tokenIndex;

						        return ret;
                  }

                  inm = float2bin(parseFloat(token, 16));
                }
                else if(isNaN(parseInt(token))){
                  validTagPC = false;
                  startBit = architecture.instructions[i].fields[a].startbit;
                  stopBit = architecture.instructions[i].fields[a].stopbit;
                }
                else {
                  var numAux = parseInt(token, 10) >>> 0;

                  if((numAux.toString(2)).length > fieldsLength){
                    console_log(oriInstruction)
                    console_log(label)
                    console_log(line)
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    if(resultPseudo == -1){
                      ret.status = "error" ;
							        ret.errorcode = 5;
							        ret.token = token;
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }

                    if(resultPseudo == -2){
                      ret.status = "error" ;
							        ret.errorcode = 14;
							        ret.token = "";
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }
                  }

                  if(isNaN(parseInt(token)) == true && resultPseudo == -3){
                    ret.status = "error" ;
						        ret.errorcode = 6;
						        ret.token = token;
						        ret.tokenIndex = tokenIndex;

						        return ret;
                  }

                  inm = (parseInt(token, 10) >>> 0).toString(2);
                }
                if(validTagPC == true){
                  if(inm.length > (architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1)){
                    ret.status = "error" ;
						        ret.errorcode = 12;
						        ret.token = token;
						        ret.tokenIndex = tokenIndex;

						        return ret;
                  }

                  binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + inm.padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                }

                //re = RegExp("[fF][0-9]+");
                re = RegExp("Field[0-9]+");
                console_log(instruction);
                instruction = instruction.replace(re, token);
                console_log(instruction);
              }
            }

            break;

          case "offset_words":
            token = instructionParts[j];
            var token_user = "";

            console_log(token);

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;

                var inm;

                if(token.match(/^0x/)){
                  var value = token.split("x");
                  if(value[1].length*4 > fieldsLength){
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    if(resultPseudo == -1){
                      ret.status = "error" ;
							        ret.errorcode = 5;
							        ret.token = token;
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }

                    if(resultPseudo == -2){
                      ret.status = "error" ;
							        ret.errorcode = 14;
							        ret.token = "";
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }

                  }

                  if(isNaN(parseInt(token, 16)) == true){
                    ret.status = "error" ;
						        ret.errorcode = 6;
						        ret.token = token;
						        ret.tokenIndex = tokenIndex;

						        return ret;
                  }

                  inm = (parseInt(token, 16)).toString(2);
                }
                else if (token.match(/^(\d)+\.(\d)+/)){
                  if(float2bin(parseFloat(token)).length > fieldsLength){
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    if(resultPseudo == -1){
                      ret.status = "error" ;
							        ret.errorcode = 5;
							        ret.token = token;
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }

                    if(resultPseudo == -2){
                      ret.status = "error" ;
							        ret.errorcode = 14;
							        ret.token = "";
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }
                  }

                  if(isNaN(parseFloat(token)) == true){
                    ret.status = "error" ;
						        ret.errorcode = 6;
						        ret.token = token;
						        ret.tokenIndex = tokenIndex;

						        return ret;
                  }

                  inm = float2bin(parseFloat(token, 16));
                }
                else if(isNaN(parseInt(token))){
                  validTagPC = false;
                  startBit = architecture.instructions[i].fields[a].startbit;
                  stopBit = architecture.instructions[i].fields[a].stopbit;
                }
                else {
                  var numAux = parseInt(token, 10) >>> 0;

                  if((numAux.toString(2)).length > fieldsLength){
                    console_log(oriInstruction)
                    console_log(label)
                    console_log(line)
                    resultPseudo = pseudoinstruction_compiler(oriInstruction, label, line);

                    console_log(resultPseudo);

                    if(resultPseudo == -1){
                      ret.status = "error" ;
							        ret.errorcode = 5;
							        ret.token = token;
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }

                    if(resultPseudo == -2){
                      ret.status = "error" ;
							        ret.errorcode = 14;
							        ret.token = "";
							        ret.tokenIndex = tokenIndex;

							        return ret;
                    }
                  }

                  if(isNaN(parseInt(token)) == true && resultPseudo == -3){
                    ret.status = "error" ;
						        ret.errorcode = 6;
						        ret.token = token;
						        ret.tokenIndex = tokenIndex;

						        return ret;
                  }

                  inm = (parseInt(token, 10) >>> 0).toString(2);
                }
                if(validTagPC == true){
                  if(inm.length > (architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1)){
                    ret.status = "error" ;
						        ret.errorcode = 12;
						        ret.token = token;
						        ret.tokenIndex = tokenIndex;

						        return ret;
                  }

                  binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + inm.padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
                }

                //re = RegExp("[fF][0-9]+");
                re = RegExp("Field[0-9]+");
                console_log(instruction);
                instruction = instruction.replace(re, token);
                console_log(instruction);
              }
            }

            break;

          default:
            token = instructionParts[j];

            console_log(token);

            for(var a = 0; a < architecture.instructions[i].fields.length; a++){
              console_log(architecture.instructions[i].fields[a].name);
              if(architecture.instructions[i].fields[a].name == signatureRawParts[j]){
                fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;

                console_log((architecture.instructions[i].co).padStart(fieldsLength, "0"));

                binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + (architecture.instructions[i].co).padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit), binary.length);

                console_log(binary);

                //re = RegExp("[fF][0-9]+");
                re = RegExp("Field[0-9]+");
                console_log(instruction);
                instruction = instruction.replace(re, token);
                console_log(instruction);
              }
              if(architecture.instructions[i].fields[a].type == "cop"){
                fieldsLength = architecture.instructions[i].fields[a].startbit - architecture.instructions[i].fields[a].stopbit + 1;

                binary = binary.substring(0, binary.length - (architecture.instructions[i].fields[a].startbit + 1)) + (architecture.instructions[i].fields[a].valueField).padStart(fieldsLength, "0") + binary.substring(binary.length - (architecture.instructions[i].fields[a].stopbit ), binary.length);
              }
            }

          break;
        }
      }

      if(validTagPC == false && resultPseudo == -3){
        console_log("pendiente");

        var padding = "";
        padding = padding.padStart((architecture.instructions[i].nwords*32)-(binary.length), "0");
        binary = binary + padding;

        var hex = bin2hex(binary);
        var auxAddr = address;

        console_log(binary);
        console_log(bin2hex(binary));

        pending_instructions.push({address: address, instruction: instruction, signature: signatureParts, signatureRaw: signatureRawParts, Label: label, binary: binary, startBit: startBit, stopBit: stopBit, visible: true, line: tokenIndex});

        if(pending == false){
          instructions.push({ Break: null, Address: "0x" + address.toString(16), Label: label , loaded: instruction, user: userInstruction, _rowVariant: '', visible: true, hide: false});
          instructions_binary.push({ Break: null, Address: "0x" + address.toString(16), Label: label , loaded: binary, user: null, _rowVariant: '', visible: false});

          address = address + (4*architecture.instructions[i].nwords);
        }
        else{
          for(var pos = 0; pos < instructions.length; pos++){
            if(parseInt(instructions[pos].Address, 16) > pendingAddress){
              instructions.splice(pos, 0, { Break: null, Address: "0x" + pendingAddress.toString(16), Label: label , loaded: instruction, user: userInstruction, _rowVariant: '', visible: true, hide: false});
              instructions_binary.splice(pos, 0, { Break: null, Address: "0x" + pendingAddress.toString(16), Label: label , loaded: binary, user: null, _rowVariant: '', visible: false});

              auxAddr = pendingAddress;
              break;
            }
          }
        }

        console_log(address.toString(16));
        console_log(instructions);

        stopFor = true;
        break;
      }

      else{
        if(resultPseudo == -3){
          console_log("no pendiente")

          var padding = "";
          padding = padding.padStart((architecture.instructions[i].nwords*32)-(binary.length), "0");

          binary = binary + padding;
          var hex = bin2hex(binary);
          var auxAddr = address;

          console_log(binary);
          console_log(bin2hex(binary));

          if(pending == false){
            instructions.push({ Break: null, Address: "0x" + address.toString(16), Label: label , loaded: instruction, user: userInstruction, _rowVariant: '', visible: true, hide: false});
            instructions_binary.push({ Break: null, Address: "0x" + address.toString(16), Label: label , loaded: binary, user: null, _rowVariant: '', visible: false});

            address = address + (4*architecture.instructions[i].nwords);
          }
          else{
            for(var pos = 0; pos < instructions.length; pos++){
              if(parseInt(instructions[pos].Address, 16) > pendingAddress){
                instructions.splice(pos, 0, { Break: null, Address: "0x" + pendingAddress.toString(16), Label: label , loaded: instruction, user: userInstruction, _rowVariant: '', visible: true, hide: false});
                instructions_binary.splice(pos, 0, { Break: null, Address: "0x" + pendingAddress.toString(16), Label: label , loaded: binary, user: null, _rowVariant: '', visible: false});

                auxAddr = pendingAddress;
                break;
              }
            }
          }

          stopFor = true;

          console_log(address.toString(16));
          console_log(instructions);
        }
      }
    }
  }
}










/*Convert hexadecimal number to floating point number*/
function hex2float ( hexvalue ){
  /*var sign     = (hexvalue & 0x80000000) ? -1 : 1;
  var exponent = ((hexvalue >> 23) & 0xff) - 127;
  var mantissa = 1 + ((hexvalue & 0x7fffff) / 0x800000);

  var valuef = sign * mantissa * Math.pow(2, exponent);
  if (-127 == exponent)
    if (1 == mantissa)
      valuef = (sign == 1) ? "+0" : "-0";
    else valuef = sign * ((hexvalue & 0x7fffff) / 0x7fffff) * Math.pow(2, -126);
  if (128 == exponent)
    if (1 == mantissa)
      valuef = (sign == 1) ? "+Inf" : "-Inf";
    else valuef = NaN;

  return valuef ;*/
  var value = hexvalue.split('x');
  var value_bit = '';

  for (var i = 0; i < value[1].length; i++){
    var aux = value[1].charAt(i);
    aux = (parseInt(aux, 16)).toString(2).padStart(4, "0");
    value_bit = value_bit + aux;
  }

  var buffer = new ArrayBuffer(4);
  new Uint8Array( buffer ).set( value_bit.match(/.{8}/g).map( binaryStringToInt ) );
  return new DataView( buffer ).getFloat32(0, false);
}

/*Convert hexadecimal number to double floating point number*/
function hex2double ( hexvalue ){
  var value = hexvalue.split('x');
  var value_bit = '';

  for (var i = 0; i < value[1].length; i++){
    var aux = value[1].charAt(i);
    aux = (parseInt(aux, 16)).toString(2).padStart(4, "0");
    value_bit = value_bit + aux;
  }

  var buffer = new ArrayBuffer(8);
  new Uint8Array( buffer ).set( value_bit.match(/.{8}/g).map(binaryStringToInt ));
  return new DataView( buffer ).getFloat64(0, false);
}

/*Convert hexadecimal number to char*/
function hex2char8 ( hexvalue ){
  var num_char = ((hexvalue.toString().length))/2;
  var exponent = 0;
  var pos = 0;

  var valuec = new Array();

  for (var i = 0; i < num_char; i++) {
    var auxHex = hexvalue.substring(pos, pos+2);
    valuec[i] = String.fromCharCode(parseInt(auxHex, 16));
    pos = pos + 2;
  }

  var characters = '';

  for (var i = 0; i < valuec.length; i++){
    characters = characters + valuec[i] + ' ';
  }

  return  characters;
}

/*Convert floating point number to binary*/
function float2bin (number){
  var i, result = "";
  var dv = new DataView(new ArrayBuffer(4));

  dv.setFloat32(0, number, false);

  for (i = 0; i < 4; i++) {
      var bits = dv.getUint8(i).toString(2);
      if (bits.length < 8) {
        bits = new Array(8 - bits.length).fill('0').join("") + bits;
      }
      result += bits;
  }
  return result;
}

/*Convert double floating point number to binary*/
function double2bin(number) {
  var i, result = "";
  var dv = new DataView(new ArrayBuffer(8));

  dv.setFloat64(0, number, false);

  for (i = 0; i < 8; i++) {
      var bits = dv.getUint8(i).toString(2);
      if (bits.length < 8) {
        bits = new Array(8 - bits.length).fill('0').join("") + bits;
      }
      result += bits;
  }
  return result;
}

/*Convert binary number to hexadecimal number*/
function bin2hex(s) {
  var i, k, part, accum, ret = '';
  for (i = s.length-1; i >= 3; i -= 4){

    part = s.substr(i+1-4, 4);
    accum = 0;
    for (k = 0; k < 4; k += 1){
      if (part[k] !== '0' && part[k] !== '1'){
          return { valid: false };
      }
      accum = accum * 2 + parseInt(part[k], 10);
    }
    if (accum >= 10){
      ret = String.fromCharCode(accum - 10 + 'A'.charCodeAt(0)) + ret;
    }
    else {
      ret = String(accum) + ret;
    }
  }

  if (i >= 0){
    accum = 0;
    for (k = 0; k <= i; k += 1){
      if (s[k] !== '0' && s[k] !== '1') {
          return { valid: false };
      }
      accum = accum * 2 + parseInt(s[k], 10);
    }
    ret = String(accum) + ret;
  }
  return ret;
}

/*Binary string to integer number*/
function binaryStringToInt( b ) {
  return parseInt(b, 2);
}

/*Reset execution*/
function reset(){
  executionIndex = 0;

  /*Reset stats*/
  totalStats=0;
  for (var i = 0; i < stats.length; i++){
    stats[i].percentage = 0;
    stats[i].number_instructions = 0;
  }

  /*Reset console*/
  mutexRead = false;
  newExecution = true;

  for (var i = 0; i < architecture_hash.length; i++) {
    for (var j = 0; j < architecture.components[i].elements.length; j++) {
      if(architecture.components[i].double_precision == false){
        architecture.components[i].elements[j].value = architecture.components[i].elements[j].default_value;
      }

      else{
        var aux_value;
        var aux_sim1;
        var aux_sim2;

        for (var a = 0; a < architecture_hash.length; a++) {
          for (var b = 0; b < architecture.components[a].elements.length; b++) {
            if(architecture.components[a].elements[b].name == architecture.components[i].elements[j].simple_reg[0]){
              aux_sim1 = bin2hex(float2bin(architecture.components[a].elements[b].default_value));
            }
            if(architecture.components[a].elements[b].name == architecture.components[i].elements[j].simple_reg[1]){
              aux_sim2 = bin2hex(float2bin(architecture.components[a].elements[b].default_value));
            }
          }
        }

        aux_value = aux_sim1 + aux_sim2;
        architecture.components[i].elements[j].value = hex2double("0x" + aux_value);
      }
    }
  }

  architecture.memory_layout[4].value = backup_stack_address;
  architecture.memory_layout[3].value = backup_data_address;

  for (var i = 0; i < memory[memory_hash[0]].length; i++) {
    if(memory[memory_hash[0]][i].reset == true){
      memory[memory_hash[0]].splice(i, 1);
      i--;
    }
    else{
      memory[memory_hash[0]][i].Value = memory[memory_hash[0]][i].DefValue;
      for (var j = 0; j < memory[memory_hash[0]][i].Binary.length; j++) {
        memory[memory_hash[0]][i].Binary[j].Bin = memory[memory_hash[0]][i].Binary[j].DefBin;
      }
    }
  }

  for (var i = 0; i < memory[memory_hash[2]].length; i++) {
    if(memory[memory_hash[2]][i].reset == true){
      memory[memory_hash[2]].splice(i, 1);
      i--;
    }
    else{
      memory[memory_hash[2]][i].Value = memory[memory_hash[2]][i].DefValue;
      for (var j = 0; j < memory[memory_hash[2]][i].Binary.length; j++) {
        memory[memory_hash[2]][i].Binary[j].Bin = memory[memory_hash[2]][i].Binary[j].DefBin;
      }
    }
  }

  unallocated_memory = [];
}



/*Bigint number to string*/
function bigInt_serialize(object){
  var auxObject = jQuery.extend(true, {}, object);

  for (var i = 0; i < architecture.components.length; i++){
    if(architecture.components[i].type != "floating point"){
      for (var j = 0; j < architecture.components[i].elements.length; j++){
        var aux = architecture.components[i].elements[j].value;
        var auxString = aux.toString();
        auxObject.components[i].elements[j].value = auxString;

        if(architecture.components[i].double_precision != true){
          var aux = architecture.components[i].elements[j].default_value;
          var auxString = aux.toString();
          auxObject.components[i].elements[j].default_value = auxString;
        }
      }
    }
  }
  return auxObject;
}

/*String to Bigint number*/
function bigInt_deserialize(object){
  var auxObject = object;

  for (var i = 0; i < auxObject.components.length; i++){
    if(auxObject.components[i].type != "floating point"){
      for (var j = 0; j < auxObject.components[i].elements.length; j++){
        var aux = auxObject.components[i].elements[j].value;
        var auxBigInt = bigInt(parseInt(aux) >>> 0, 10).value;
        auxObject.components[i].elements[j].value = auxBigInt;

        if(auxObject.components[i].double_precision != true){
          var aux = auxObject.components[i].elements[j].default_value;
          var auxBigInt = bigInt(parseInt(aux) >>> 0, 10).value;
          auxObject.components[i].elements[j].default_value = auxBigInt;
        }
      }
    }
  }
  return auxObject;
}

