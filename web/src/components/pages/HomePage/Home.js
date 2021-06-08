import React, {useEffect} from 'react';
import HeroSection from '../../HeroSection';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';

function Home() {
    useEffect(() => {
          savetoken();

    }, []);

    const savetoken = async ()=>{
        console.log("Reached save token")
        fetch('http://localhost:3001/savetoken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                useremail: global.useremail,
            }),
        })
            .then((resJson) => {
                fetch('http://localhost:3001/getallusers_videoid')
                    .then((res) => res.json())
                    .then((resJson) => {
                        console.log("Reached save token 2")
                        for (var i = 0; i < resJson.length; ++i) {
                            if (resJson[i].email == global.useremail) {
                                global.sessionid = '' + resJson[i].sessionId;
                                global.tokenid = '' + resJson[i].tokenid;

                            }
                        }
                       localStorage.setItem("sessionid",global.sessionid)
                       localStorage.setItem("tokenid",global.tokenid)

                    })
                    .catch((e) => console.log(e));
            })
            .then(async (data) => {});

    }
  return (
    <>
      <HeroSection {...homeObjOne} />
      <HeroSection {...homeObjThree} />
      <HeroSection {...homeObjTwo} />
      <HeroSection {...homeObjFour} />
    </>
  );
}

export default Home;
