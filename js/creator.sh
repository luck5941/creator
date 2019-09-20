#!/usr/bin/env node

   var creator  = require('./min.creator_node.js') ;
   var fs       = require('fs') ;


   //
   // (1) Usage
   //

   if (process.argv.length < 3)
   {
       console.log("") ;
       console.log("Usage: creator.sh <assembly file>.s") ;
       console.log("") ;

       return 0 ;
   }


   //
   // (2) Get arguments
   //
 
   try 
   {
       var assembly = fs.readFileSync(process.argv[1], 'utf8') ;
       var result   = creator.assembly_compile(assembly) ;
       console.log(result) ;
   }
   catch (e)
   {
       console.log(e);
       return false ;
   }

