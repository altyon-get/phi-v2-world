import React from 'react'
import profileImg from '../../Assets/avatar.svg'

export default function profiles({ Leaderboard },index) {
    return (
        <div class="board-profile">
            {Item(Leaderboard,index)}
        </div>
    )
}

function Item(data,index) {
    // console.log('hi ji imhere')
    data.sort((a, b) => {
        var keyA = a.score,keyB = b.score;
        // Compare the 2 dates
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });
    let list=data.slice(index,2);
    console.log(data, ' -data');
    return (
        <>
            {
                list.map((value) => (
                    <>
                        {value.name == 'shubham ojha' ?
                            <></> :
                            <div className="board-flex">
                                <div className="board-item">
                                    <img src={profileImg} alt="" />

                                    <div className="board-info">
                                        <h3 className='board-name board-text-dark'>{value.name}</h3>
                                        <span>
                                            <i>
                                               [ {value.city || 'unknown'} ]
                                            </i>
                                        </span>
                                    </div>
                                </div>
                                <div className="board-item">
                                    Score:<span>{value.score || 0}</span>
                                </div>
                            </div>
                        }
                    </>
                )
                )
            }
        </>


    )
}
