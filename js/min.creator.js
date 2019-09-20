

var test = {
  foo () { console.log('foo') },
  bar () { console.log('bar') },
  baz () { console.log('baz') }
}

//export default test

function assembly_compile ()
{
	test.foo();
}

module.exports.assembly_compile = assembly_compile ;
//export default test