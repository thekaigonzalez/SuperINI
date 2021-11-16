// Copyright 2021 kaigonzalez
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

function generateINIObject(code) {
    let buffer = "";

    let prop = {}

    let state = 0;

    let k = "";
    let v = ""

    let cate = "";

    for (let i = 0 ; i < code.length ; ++ i) {
        // console.log(buffer)
        if (code[i] == '=' && state == 0 || state == 1) {
                state = 6;
                k = buffer.trim();

                // console.log("key " + k)
            
            buffer = "";
        } else if (code[i] == '\n') {
            if (cate.trim() == '' && state == 6) {
                // console.log(buffer);
                v = buffer.trim()
                prop[k] = eval(v.trim());
                state = 0
            } else if (cate.trim() != '' && state == 6) {
                v = buffer.trim()
                prop[cate][k] = eval(v.trim());
                buffer = "";
                state = 0
            } else if (state == 7) {buffer = ""; state = 0 }
            else if (buffer.trim() == '') {
                buffer = ""
                cate = ""
                state = 0
            }
            buffer = "";
        } else if (code[i] == '[' && state == 0) {
            state = 9  
        } else if (code[i] == ']' && state == 9) {
            cate = buffer.trim()
            buffer = "";
            prop[cate] = {}
            state = 7;
        } else {
            buffer += code[i]
        }
    }

    if (buffer.length > 0) {
        if (cate.trim() == '' && state == 6) {
            // console.log(buffer);
            v = buffer.trim()
            prop[k] = eval(v.trim());
            state = 0
        } else if (cate.trim() != '' && state == 6) {
            v = buffer.trim()
            prop[cate][k] = eval(v.trim());
            buffer = "";
            state = 0
        } else if (state == 7) { console.log("cleaning "); buffer = ""; state = 0 }
        else if (buffer.trim() == '') {
            buffer = ""
            cate = ""
            state = 0
        }
        buffer = "";
    }

    return prop;
}

// console.log(generateINIObject("[my category]\ni = 1\nb = 2\nc = 3\n\nb = 1\n[new category]\ni = 8\n\na = 7"))

module.exports.compile_ini = generateINIObject