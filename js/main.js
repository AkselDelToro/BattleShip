// sets up the ships and their attributes
let ships = [
    {name: "Aircraft Carrier", code: "AC", size: 5, hitCt: 0, squares: [], placed: false, sunk: false},
    {name: "Battleship", code: "BS", size: 4, hitCt: 0, squares: [], placed: false, sunk: false},
    {name: "Submarine", code: "SM", size: 3, hitCt: 0, squares: [], placed: false, sunk: false},
    {name: "Cruiser", code: "CR", size: 3, hitCt: 0, squares: [], placed: false, sunk: false},
    {name: "Destroyer", code: "DS", size: 2, hitCt: 0, squares: [], placed: false, sunk: false}
]

// for the info the user enter at the start
let user = {
    name: null,
    maxTurns: 0
}

// the different icons the user will see on screen
let icons = {
    water: '<img src="imgs/water.png" alt="water"/>',
    boat: '<img src="imgs/boat.png" height="50" alt="boat"/>',
    miss : '<img src="imgs/miss.png" height="50" width="50" alt="miss"/>',
    hit : '<img src="imgs/hit.png" height="50" width="50" alt="hit"/>',
    sunk : '<img src="imgs/sunk.png" height="50" width="50" alt="sunk"/>'
}

// sets up the game including the rules as well
let game = {
    board:
        [
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null]
        ],
    sunkShips : [],
    placeShips: function () {
        let directions = 4;
        ships.forEach(ship => {
            while (!ship.placed) {
                let row = Math.floor(Math.random() * this.board.length);
                let col = Math.floor(Math.random() * this.board.length);
                let dir = Math.floor(Math.random() * directions);
                let endCheck = "";
                if (dir === 0) {
                    endCheck = `${row - ship.size + 1}${col}`;
                    if (endCheck.length !== 3) {
                        let crosses = false;
                        for (let i = 0; i < ship.size; i++) {
                            if (game.board[row - i][col] != null) {
                                crosses = true;
                            }
                        }
                        if (!crosses) {
                            for (let i = 0; i < ship.size; i++) {
                                let tokStr = `${row - i}${col}`;
                                if (game.board[row - i][col] == null) {
                                    ship.squares.push(tokStr);
                                    game.board[row - i][col] = ship.code;
                                }
                            }
                            ship.placed = true;
                        }
                    }
                } else if (dir === 1) {
                    endCheck = `${row}${col + ship.size - 1}`;
                    if (endCheck.length !== 3) {
                        let crosses = false;
                        for (let i = 0; i < ship.size; i++) {
                            if (game.board[row][col + i] != null) {
                                crosses = true;
                            }
                        }
                        if (!crosses) {
                            for (let i = 0; i < ship.size; i++) {
                                let tokStr = `${row}${col + i}`;
                                if (game.board[row][col + i] == null) {
                                    ship.squares.push(tokStr);
                                    game.board[row][col + i] = ship.code;
                                }
                            }
                            ship.placed = true;
                        }
                    }
                } else if (dir === 2) {
                    endCheck = `${row + ship.size - 1}${col}`;
                    if (endCheck.length !== 3) {
                        let crosses = false;
                        for (let i = 0; i < ship.size; i++) {
                            if (game.board[row + i][col] != null) {
                                crosses = true;
                            }
                        }
                        if (!crosses) {
                            for (let i = 0; i < ship.size; i++) {
                                let tokStr = `${row + i}${col}`;
                                if (game.board[row + i][col] == null) {
                                    ship.squares.push(tokStr);
                                    game.board[row + i][col] = ship.code;
                                }
                            }
                            ship.placed = true;
                        }
                    }
                } else if (dir === 3) {
                    endCheck = `${row}${col - ship.size + 1}`;
                    if (endCheck.length !== 3) {
                        let crosses = false;
                        for (let i = 0; i < ship.size; i++) {
                            if (game.board[row][col - i] != null) {
                                crosses = true;
                            }
                        }
                        if (!crosses) {
                            for (let i = 0; i < ship.size; i++) {
                                let tokStr = `${row}${col - i}`;
                                if (game.board[row][col - i] == null) {
                                    ship.squares.push(tokStr);
                                    game.board[row][col - i] = ship.code;
                                }
                            }
                            ship.placed = true;
                        }
                    }
                }
            }
        });
    },
    shoot : function (square) {
        if (user.name != null) {
            if (isNaN(parseInt(square.toString().substring(1)))) {
                square = "0" + square;
            }

            let row = parseInt(square.toString().substring(0,1));
            let col = parseInt(square.toString().substring(1));
            let hits = parseInt(document.getElementById("hits").innerHTML);
            let misses = parseInt(document.getElementById("misses").innerHTML);
            let shots = parseInt(document.getElementById("shots").innerHTML);

            if (game.board[row][col] == null) {
                document.getElementById(`${row}${col}`).innerHTML = icons.miss;
                misses += 1;
                shots += 1;
                document.getElementById("misses").innerHTML = `${misses}`;
                document.getElementById("alert").innerHTML = `Miss!`;
                game.board[row][col] = "X";
            } else if (game.board[row][col] !== "X" && game.board[row][col] !== "/") {
                document.getElementById(`${row}${col}`).innerHTML = icons.hit;
                hits += 1;
                shots += 1;
                document.getElementById("hits").innerHTML = `${hits}`;
                this.checkHitSunk(game.board[row][col]);
                game.board[row][col] = "/";
            }

            this.updateShips();
            document.getElementById("shots").innerHTML = `${shots}`;
            if (this.checkGameOver()) {
                showBoat();
                user.name = null;
                document.getElementById("showBoat").style.display = "none";
                document.getElementById("reset").style.display = "inline";
            }
        }
    },
    checkHitSunk : function (hitShipCode) {
        ships.forEach(ship => {
            if (hitShipCode === ship.code) {
                ship.hitCt += 1;
                if (ship.code === "AC") {
                    document.getElementById("accHits").innerHTML = `${ship.hitCt}`;
                } else if (ship.code === "BS")  {
                    document.getElementById("bsHits").innerHTML = `${ship.hitCt}`;
                } else if (ship.code === "SM")  {
                    document.getElementById("smHits").innerHTML = `${ship.hitCt}`;
                } else if (ship.code === "CR")  {
                    document.getElementById("csHits").innerHTML = `${ship.hitCt}`;
                } else if (ship.code === "DS") {
                    document.getElementById("dsHits").innerHTML = `${ship.hitCt}`;
                }
                if (ship.hitCt === ship.size) {
                    ship.sunk = true;
                    document.getElementById("alert").innerHTML = `SHIP SUNK! ${ship.name}`;
                    ship.squares.forEach(square => {
                        let row = parseInt(square.substring(0,1));
                        let col = parseInt(square.substring(1));
                        document.getElementById(`${row}${col}`).innerHTML = icons.sunk;
                    });
                } else {
                    document.getElementById("alert").innerHTML = `Hit! ${ship.name}`;
                }
            }
        });
    },
    updateShips : function () {
        let sunk = parseInt(document.getElementById("sunk").innerHTML);
        let shipsLeft = parseInt(document.getElementById("shipsLeft").innerHTML);

        ships.forEach(ship => {
            if (!this.sunkShips.includes(ship.code) && ship.sunk) {
                if (ship.code === "AC") {
                    document.getElementById("accStatus").innerHTML = "Sunk";
                } else if (ship.code === "BS" && ship.sunk)  {
                    document.getElementById("bsStatus").innerHTML = "Sunk";
                } else if (ship.code === "SM" && ship.sunk)  {
                    document.getElementById("smStatus").innerHTML = "Sunk";
                } else if (ship.code === "CR" && ship.sunk)  {
                    document.getElementById("csStatus").innerHTML = "Sunk";
                } else if (ship.code === "DS" && ship.sunk) {
                    document.getElementById("dsStatus").innerHTML = "Sunk";
                }
                sunk += 1;
                shipsLeft -= 1;
                this.sunkShips.push(ship.code);
                document.getElementById("shipsLeft").innerHTML = `${shipsLeft}`;
            }
        });
        document.getElementById("sunk").innerHTML = `${sunk}`;
    },
    checkGameOver : function () {
        if (parseInt(document.getElementById("misses").innerHTML) === user.maxTurns) {
            document.getElementById("alert").innerHTML = `GAME OVER! You missed ${user.maxTurns} times.`;
            document.getElementById("winner").innerHTML = "Computer Wins!";
            document.getElementById("winner").style.display = "block";
            document.getElementById("winContainer").style.height = "75px";
            return true
        } else if (parseInt(document.getElementById("shipsLeft").innerHTML) === 0) {
            document.getElementById("alert").innerHTML = `GAME OVER! You sunk all ${this.sunkShips.length} ships.`;
            document.getElementById("winner").innerHTML = `${user.name} Wins!`;
            document.getElementById("winner").style.display = "block";
            document.getElementById("winContainer").style.height = "75px";
            return true;
        }
        return false;
    }
}

function setupBoard() {
    let tRow = " ";
    for (let r = 0; r < game.board.length; r++) {
        tRow += `<tr id="R${r}">`;
        for (let c = 0; c < game.board.length; c++) {
            let tokStr = `${r}${c}`;
            let square = game.board[r][c];
            if (square == null) {
                tRow += `<td id="${tokStr}" onclick='game.shoot(${tokStr})'> ${icons.water} </td>`;
            } else {
                game.board[r][c] = null;
                tRow += `<td id="${tokStr}" onclick='game.shoot(${tokStr})'> ${icons.water} </td>`;
            }
        }
        tRow += `</tr>`;
    }
    document.getElementById("table1").innerHTML = tRow;
}

function gameSetup() {
    setupBoard();
    document.getElementById("name").value = "";
    document.getElementById("turns").value = ""
    document.getElementById("startGame").style.display = "block";
    document.getElementById("playGame").style.display = "none";
    document.getElementById("winner").style.display = "none";
    document.getElementById("winContainer").style.height = "0px";
    document.getElementById("turnError").innerHTML = "";
    user.name = null;
    user.maxTurns = 0;
}

function showBoat() {
    let toggle = document.getElementById("showBoat");
    if (toggle.value === "Yes" || game.checkGameOver()) {
        ships.forEach(ship => {
            ship.squares.forEach(square => {
                let row = parseInt(square.substring(0,1));
                let col = parseInt(square.substring(1));
                let sq = game.board[row][col];
                if (sq !== "/") {
                    document.getElementById(`${row}${col}`).innerHTML = icons.boat;
                }
            });
        });
        toggle.value = "No";
    } else if (toggle.value === "No") {
        ships.forEach(ship => {
            ship.squares.forEach(square => {
                let row = parseInt(square.substring(0,1));
                let col = parseInt(square.substring(1));
                let sq = game.board[row][col];
                if (sq !== "/") {
                    document.getElementById(`${row}${col}`).innerHTML = icons.water;
                }
            });
        });
        toggle.value = "Yes";
    }
}

function startGame() {
    user.maxTurns = document.getElementById("turns").value;
    let roundedTurns = Math.round(user.maxTurns);
    if (user.maxTurns >= 1 && user.maxTurns <= 100) {
        user.name = document.getElementById("name").value;
        user.maxTurns = roundedTurns;
        ships.forEach(ship => {
            ship.placed = false;
            ship.sunk = false;
            ship.hitCt = 0;
            ship.squares = [];
        });
        game.sunkShips = [];
        game.placeShips();
        document.getElementById("startGame").style.display = "none";
        document.getElementById("playGame").style.display = "block";
        document.getElementById("showBoat").style.display = "inline";
        document.getElementById("reset").style.display = "none";
        document.getElementById("header2").innerHTML = `${user.name}'s War Board`;
        document.getElementById("maxMisses").innerHTML = `Max Misses: ${roundedTurns}`;
        document.getElementById("shots").innerHTML = "0";
        document.getElementById("hits").innerHTML = "0";
        document.getElementById("misses").innerHTML = "0";
        document.getElementById("sunk").innerHTML = "0";
        document.getElementById("shipsLeft").innerHTML = "5";
        document.getElementById("alert").innerHTML = "Click a square to begin!";
        document.getElementById("accHits").innerHTML = "0";
        document.getElementById("bsHits").innerHTML = "0";
        document.getElementById("smHits").innerHTML = "0";
        document.getElementById("csHits").innerHTML = "0";
        document.getElementById("dsHits").innerHTML = "0";
        document.getElementById("accStatus").innerHTML = "Alive";
        document.getElementById("bsStatus").innerHTML = "Alive";
        document.getElementById("smStatus").innerHTML = "Alive";
        document.getElementById("csStatus").innerHTML = "Alive";
        document.getElementById("dsStatus").innerHTML = "Alive";
    } else {
        document.getElementById("turnError").innerHTML = `${user.maxTurns} is invalid. Please enter a number from 1-100.`
    }
}