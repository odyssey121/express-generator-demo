class TestStatic {
    test1(){
        console.log('test');
    }

    static test2(){
        console.log('test2');
    }
}

const instance = new TestStatic();
instance.test1();
TestStatic.test2();