import type { DrillType, LicenseLevel, MomentOfGame, SetupDiagram, SkillLevel } from "@/lib/club/catalog";

type AgeBand = "U8-U10" | "U11-U13" | "U14-U16";

type Row = {
  focus: string;
  type: DrillType;
  playerSetup: string;
  constraint: string;
  diagram: SetupDiagram;
  minutes: number;
  length: number;
  width: number;
  workRest: string;
  repetitions: number;
  attackers: number;
  defenders: number;
  neutrals: number;
  goalkeepers: number;
  pitchSetup: string;
  instructions: string;
  coachingPoints: [string, string, string];
  progressions: [string, string];
};

function r(
  focus: string,
  type: DrillType,
  playerSetup: string,
  constraint: string,
  diagram: SetupDiagram,
  minutes: number,
  length: number,
  width: number,
  workRest: string,
  repetitions: number,
  attackers: number,
  defenders: number,
  neutrals: number,
  goalkeepers: number,
  pitchSetup: string,
  instructions: string,
  c1: string,
  c2: string,
  c3: string,
  g1: string,
  g2: string,
): Row {
  return {
    focus,
    type,
    playerSetup,
    constraint,
    diagram,
    minutes,
    length,
    width,
    workRest,
    repetitions,
    attackers,
    defenders,
    neutrals,
    goalkeepers,
    pitchSetup,
    instructions,
    coachingPoints: [c1, c2, c3],
    progressions: [g1, g2],
  };
}

const AGES = [6, 7, 8, 9, 10, 11, 12, 13] as const;
const MOMENTS: MomentOfGame[] = ["IP", "OOP", "T2A", "T2D"];

function eight(name: string, rows: Row[]) {
  if (rows.length !== 8) throw new Error(`${name} has ${rows.length} ages`);
  return rows;
}

const packs: Record<SkillLevel, Record<MomentOfGame, Row[][]>> = {
  Beginner: {
    IP: [
      eight("b-ip-0", [
        r("Outside Foot", "TP", "One Each", "Middle Gate", "gates", 8, 12, 8, "2:1", 6, 6, 0, 0, 0, "12x8m lane with three gates, each two steps wide. One ball per player.", "Each player dribbles through three narrow gates and uses the outside of the foot in the middle gate.", "Keep the ball within one step", "Use the outside of the foot in the middle gate", "Look up before the next gate", "Race back to the start.", "Make the middle gate one step narrower."),
        r("Sole Stop", "WU", "Three Lines", "Stop Then Go", "lanes", 8, 14, 10, "2:1", 6, 6, 0, 0, 0, "14x10m with three stopping lines. One ball per player.", "Players stop the ball dead on each line with the sole, then accelerate into the next square.", "The stop is with the sole", "The next touch is out of the stop", "Stay low when the ball is dead", "Stop with the weaker foot.", "A partner calls the line."),
        r("Gate Pass", "TP", "Pairs", "Follow the Pass", "gates", 10, 16, 12, "2:1", 5, 4, 0, 0, 0, "16x12m with two gates. One ball per pair.", "Pairs pass the ball through a gate and the passer follows the ball to the far side.", "Pass to the back foot", "The passer moves as the ball travels", "Receive side-on to the next gate", "Play the return first time.", "Add a third gate."),
        r("Disguise Pass", "TP", "Fours", "Wrong Way", "square", 10, 18, 14, "3:1", 4, 4, 0, 0, 0, "18x14m square. One ball for four players.", "Four players keep the ball and must show a pass one way before they play it the other way.", "The disguise is with the hips", "The real pass is firm", "The next player is already moving", "Limit the disguise to one touch.", "Add a passive defender."),
        r("Free Gate", "SP", "Wall Player", "Call It", "gates", 12, 20, 14, "3:1", 4, 3, 1, 0, 0, "20x14m with three gates and a wall player. One ball.", "The wall player bounces the ball and the runner attacks the gate the coach has not called.", "Call the gate before the pass", "The bounce is to feet", "Attack the free gate at once", "The runner chooses the gate.", "Two runners go at the same time."),
        r("Forward Body", "TP", "Threes", "Face Forward", "channel", 12, 22, 16, "3:1", 4, 3, 0, 0, 0, "22x16m channel. Three players and one ball.", "Three players combine so the third player receives with an open body, already facing forward.", "Open the body before the ball arrives", "The third player does not stop the ball", "The first pass is out of the feet", "The third player finishes into a mini goal.", "One touch for the middle player."),
        r("Split Pass", "SSG", "4v2", "Ground Ball", "rondo", 14, 24, 18, "3:1", 3, 4, 2, 0, 0, "24x18m with two cone gates in the middle. One ball.", "Four attackers keep the ball against two and score by passing along the ground between a pair of cones.", "The split is on the ground", "The receiver attacks the gate", "Defenders stay connected", "The split must be first time.", "Add a third defender."),
        r("Late Switch", "SSG", "Eights", "Four Passes", "square", 16, 28, 20, "4:1", 3, 8, 0, 0, 0, "28x20m rectangle. Eight players and one ball.", "Eight players circulate the ball and switch the point of attack once four passes are complete.", "The switch is early", "The far player waits, then checks", "Count the passes out loud", "The switch must be one touch.", "A defender may intercept the switch."),
      ]),
      eight("b-ip-1", [
        r("Toe Taps", "WU", "Pairs", "New Partner", "square", 8, 12, 12, "2:1", 6, 8, 0, 0, 0, "12x12m grid. One ball each.", "Every player taps the ball between the feet, then plays a short pass and finds a new partner.", "Taps stay soft", "The pass is along the ground", "Find the new partner with the eyes first", "Use the weaker foot only.", "The new partner calls their name."),
        r("Figure Eight", "WU", "One Each", "Change Foot", "gates", 8, 14, 8, "2:1", 6, 6, 0, 0, 0, "14x8m with two cones per player.", "Players weave a figure of eight around two cones and change foot at the far cone.", "The ball stays outside the cones", "Change foot at the far cone", "Small steps around the turn", "Race a partner.", "Add a third cone."),
        r("Wall Pass", "TP", "End Player", "Back Foot", "square", 10, 16, 10, "2:1", 5, 3, 0, 0, 0, "16x10m. Three players and one ball.", "The player on the end plays a wall pass and takes the return with the back foot.", "The wall pass is firm", "Take the return with the back foot", "The third player is already moving", "The return is one touch.", "The wall player may move."),
        r("Three Keep", "SSG", "3v1", "Tight Square", "rondo", 10, 10, 10, "3:1", 4, 3, 1, 0, 0, "10x10m square. Three outside, one inside.", "Three players keep the ball away from one defender inside a tight square.", "Play away from the defender", "The spare player shows early", "The defender bends the run", "Two touches only.", "The defender scores by winning it."),
        r("Face Pass", "TP", "Fours", "Play Forward", "lanes", 12, 20, 12, "3:1", 4, 4, 0, 0, 0, "20x12m lane. Four players in a line and one ball.", "The receiver plays the way they are facing, then turns out to find the next player.", "Play the way you face first", "The turn is away from pressure", "The next pass is into space", "The first pass is one touch.", "A chaser starts behind the ball."),
        r("Overlap Pass", "SP", "Wide Player", "Ground Cross", "overlap", 12, 24, 16, "3:1", 4, 3, 0, 0, 1, "24x16m to one mini goal. Three outfield players and a keeper.", "The wide player overlaps and plays a ground pass across the gate for a finish.", "The overlap starts before the pass", "The cross stays on the ground", "Finish across the keeper", "The cross is one touch.", "Add a recovering defender."),
        r("Spin Out", "TP", "Target", "New Cone", "square", 12, 18, 18, "3:1", 4, 5, 0, 0, 0, "18x18m with a target player in the middle.", "A target bounces the ball back and the passer spins away to a new cone.", "The bounce is to the back foot", "Spin out, do not stop", "The next cone is free", "The target may follow the spin.", "Two balls are live."),
        r("Late Check", "TP", "Far Player", "Half Turn", "channel", 14, 26, 16, "3:1", 4, 4, 0, 0, 0, "26x16m channel. Four players and one ball.", "The far player checks late, receives on the half-turn, and plays the next pass first time.", "Check late", "Receive on the half-turn", "The next pass is first time", "The check comes from behind a cone.", "A defender stands on the far player."),
      ]),
    ],
    OOP: [
      eight("b-oop-0", [
        r("Mirror Line", "TP", "Pairs", "Stay on the Line", "lanes", 8, 12, 8, "2:1", 6, 1, 1, 0, 0, "12x8m with a line of cones between the pair.", "The defender mirrors a partner and stays on the line between two cones.", "See the ball and the player", "Feet stay live", "Do not cross the line", "The attacker may change speed.", "Add a second ball."),
        r("Sideways Start", "TP", "Pairs", "Touch Then Turn", "press", 8, 12, 10, "2:1", 6, 1, 1, 0, 0, "12x10m lane. One attacker with a ball and one defender.", "The defender starts sideways and turns only when the attacker touches the ball.", "The first step is sideways", "Turn as the touch happens", "Do not dive in", "The attacker can use either foot.", "The defender starts further away."),
        r("Bib Link", "WU", "Linked Pair", "Move Together", "lanes", 8, 14, 10, "2:1", 6, 1, 2, 0, 0, "14x10m lane. Two defenders share a bib and one attacker has the ball.", "Two defenders hold a bib between them and move together to stop a dribble.", "The bib stays tight", "They move on the same foot", "Show the attacker one side", "The attacker may stop and start.", "The pair must talk."),
        r("Deep Cover", "TP", "First and Second", "One Cone Deeper", "press", 10, 16, 12, "2:1", 5, 1, 2, 0, 0, "16x12m. One attacker and two defenders.", "The first defender presses the ball and the second stays one cone deeper as cover.", "The press is curved", "Cover stays deeper", "The attacker is shown wide", "Cover may step up if the press is beaten.", "Add a second attacker."),
        r("Show Side", "SP", "Pairs", "Force Wide", "channel", 10, 18, 12, "3:1", 5, 1, 1, 0, 0, "18x12m with side gates. One attacker and one defender.", "Defenders score a point by forcing the ball out through the side they are showing.", "Body shape shows one side", "Do not reach", "The side gate is the score", "The attacker has two touches.", "Both side gates are live."),
        r("Sideways Step", "WU", "Line of Four", "Side Pass", "lanes", 10, 20, 14, "2:1", 4, 1, 4, 0, 0, "20x14m. Four defenders in a line and one server.", "Four players shuffle as a line and the nearest player steps out only when the pass goes sideways.", "The line moves together", "Step out only on a sideways pass", "The others cover the gap", "The server may pass forward.", "The line starts higher."),
        r("Near Goal", "SSG", "Two Goals", "Leave the Far One", "gates", 12, 22, 16, "3:1", 4, 3, 3, 0, 0, "22x16m with a small goal at each end.", "The team protects the near small goal and leaves the far goal until the ball travels.", "Protect the near goal first", "Talk before leaving it", "Recover if the ball switches", "The far goal becomes live after one pass.", "Add a neutral on the side."),
        r("Second Goal", "SSG", "Goal and Counter", "Cover Set", "channel", 14, 28, 18, "3:1", 3, 4, 4, 0, 2, "28x18m with a goal at each end and a counter goal behind the defence.", "Defenders protect a goal while a second goal behind them punishes a missed cover.", "The cover sees the second goal", "Do not all dive in", "The keeper organises the line", "A missed cover is a goal against.", "The counter goal is smaller."),
      ]),
      eight("b-oop-1", [
        r("Ball Touch", "WU", "Pairs", "Hand on Own Ball", "square", 8, 12, 12, "2:1", 6, 1, 1, 0, 0, "12x12m. Both players have a ball.", "The chaser tries to touch the ball-carrier's ball while keeping a hand on their own ball.", "Keep your own ball close", "Chase with short steps", "Touch the ball, do not kick it away", "The carrier may turn.", "Both players chase in turns."),
        r("Pole Step", "WU", "Partners", "Do Not Overtake", "lanes", 8, 14, 8, "2:1", 6, 2, 0, 0, 0, "14x8m lane with poles.", "Partners side-step through poles and the back player must not overtake.", "Stay shoulder to shoulder", "The back player keeps the distance", "Eyes forward", "Speed up between the poles.", "Add a ball for the front player."),
        r("Side Cone", "TP", "Pairs", "Walk Them Wide", "press", 8, 15, 10, "2:1", 6, 1, 1, 0, 0, "15x10m lane with a side cone.", "The defender arrives side-on and walks the attacker toward a side cone.", "Arrive side-on", "Walk, do not sprint past", "The cone is the trap", "The attacker may stop the ball.", "Start the defender closer."),
        r("Line Jump", "WU", "Three Players", "Cone Up", "lanes", 8, 16, 12, "2:1", 6, 0, 3, 0, 0, "16x12m. Three defenders and a coach with a cone.", "A three-player line jumps forward together when the coach raises a cone.", "Jump on the cone, not before", "Distances stay even", "Land ready to move again", "The cone can go left or right.", "Add a ball in front of the line."),
        r("Blind Side", "SP", "Press and Friend", "Steal In", "press", 10, 16, 12, "3:1", 5, 1, 2, 0, 0, "16x12m. One attacker and two defenders.", "The presser shows one way and a friend steals in from the blind side.", "Show one way only", "The friend waits for the touch", "Do not both dive in", "The friend starts further away.", "The attacker may turn if the angle is wrong."),
        r("Second Touch", "SP", "Box Defenders", "Wait for Two", "channel", 10, 20, 14, "3:1", 4, 2, 3, 0, 1, "20x14m to one goal. Two attackers, three defenders and a keeper.", "Defenders drop into a narrow box and may tackle only after the attacker takes a second touch.", "Wait for the second touch", "The box stays narrow", "The keeper claims the cross", "A one-touch shot does not count.", "The attackers can combine."),
        r("Talk First", "SSG", "Two Small Goals", "Name the Goal", "gates", 12, 22, 16, "3:1", 4, 3, 3, 0, 0, "22x16m with two small goals.", "Two small goals are live, and the defenders must talk before they step.", "Name the goal before you step", "The other goal still has a player", "Step together", "A silent step does not count.", "Add a fourth defender."),
        r("Backwards Jump", "TP", "Back Line", "Ball Goes Back", "press", 12, 24, 18, "3:1", 4, 4, 4, 0, 0, "24x18m. Four defend against four.", "The back line holds until the ball is played backwards, then one player jumps.", "Hold until the ball goes back", "Only one player jumps", "The others cover the space", "A square pass is not the trigger.", "The jump has three seconds."),
      ]),
    ],
    T2A: [
      eight("b-t2a-0", [
        r("Empty Gate", "SP", "One Each", "Coach Calls Go", "gates", 8, 12, 10, "2:1", 6, 4, 0, 0, 0, "12x10m with empty gates. One ball per player.", "When the coach calls go, the player with the ball runs it into an empty gate.", "Look for the empty gate first", "The first step is forward", "Stop the ball in the gate", "Two players go at once.", "A gate can be closed by the coach."),
        r("Bobble Pass", "TP", "Pairs", "Before Two Touches", "lanes", 8, 14, 10, "2:1", 6, 2, 0, 0, 0, "14x10m lane. One bobbling ball for the pair.", "The player who wins a bobbling ball passes it forward before a second touch.", "Win the ball with the body side-on", "The pass is forward", "The partner is already moving", "The pass must be one touch.", "A third player contests the ball."),
        r("Already Running", "SP", "Pairs", "Steal and Go", "channel", 10, 16, 12, "2:1", 5, 2, 1, 0, 0, "16x12m. Two attackers and one defender.", "Pairs steal a pass and the free player must already be running.", "The run starts before the steal", "The first pass is into the run", "Do not stop the ball", "The defender may tackle.", "The run must be in behind."),
        r("Five Seconds", "SP", "3v1", "Beyond the Cone", "channel", 10, 20, 14, "3:1", 5, 3, 1, 0, 0, "20x14m with a last cone. Three attackers and one defender.", "After a tackle, the ball is played into a runner beyond the last cone within five seconds.", "The runner goes beyond the cone", "Five seconds, then the move is dead", "The pass is in front of the runner", "Four seconds.", "A second defender recovers."),
        r("Forward Only", "SSG", "2v1", "No Square Pass", "channel", 12, 22, 12, "3:1", 6, 2, 1, 0, 1, "22x12m to one mini goal.", "The regain starts a 2v1 and the pass must be forward, not square.", "The first pass faces the goal", "The partner runs beyond the ball", "Finish before help arrives", "A square pass ends the move.", "The defender starts closer."),
        r("Halfway Break", "SP", "3v2", "Win on Halfway", "channel", 12, 28, 16, "3:1", 5, 3, 2, 0, 1, "28x16m to one goal. The ball starts on halfway.", "Three players attack two after winning the ball on the halfway line of the small pitch.", "Win it and play forward", "The third player stays wide", "Finish across the keeper", "The attack has six seconds.", "A fourth defender starts behind."),
        r("Tackle Start", "SSG", "4v4", "From a Tackle", "gates", 14, 30, 20, "3:1", 4, 4, 4, 0, 0, "30x20m with a goal at each end.", "A 4v4 scores only from a move that began with a tackle.", "The tackle is the start", "The next pass breaks a line", "A slow move does not count", "The scorer must be the player who did not tackle.", "Both teams leave a rest player."),
        r("Eight Seconds", "SSG", "5v5", "Far Goal", "channel", 14, 36, 24, "4:1", 3, 5, 5, 0, 2, "36x24m with a goal at each end.", "The team that wins the ball attacks the far goal and the move dies after eight seconds.", "Secure, then play forward", "Eight seconds is the limit", "Two players stay as rest defence", "Six seconds.", "A goal after the count is disallowed."),
      ]),
      eight("b-t2a-1", [
        r("Call the Hoop", "WU", "Pairs", "Sprint to the Hoop", "gates", 8, 12, 12, "2:1", 6, 2, 0, 0, 0, "12x12m with a hoop at each end.", "The resting player sprints into a hoop and calls for the ball as soon as their partner wins it.", "Call as you arrive", "The pass is into the hoop", "Win the ball and look up", "The hoop is further away.", "Two hoops are live."),
        r("Forward Cone", "TP", "Threes", "Only Forward Scores", "lanes", 8, 16, 10, "2:1", 6, 3, 0, 0, 0, "16x10m with a forward cone.", "A pass into a forward cone is the only pass that scores after the turnover.", "The cone is the target", "Ignore the square pass", "The receiver is facing forward", "The cone moves each turn.", "A defender protects the cone."),
        r("Safe Support", "TP", "Threes", "Behind the Ball", "square", 10, 16, 12, "2:1", 5, 3, 0, 0, 0, "16x12m. Three players and one ball.", "The supporter stands behind the ball so the winner has a way out before going forward.", "Support is underneath the ball", "Forward if the picture is on", "Body shape can play both ways", "The forward pass is compulsory.", "A passive defender stands on the supporter."),
        r("Break Poles", "SP", "Fours", "Through the Poles", "gates", 10, 18, 12, "3:1", 5, 4, 0, 0, 0, "18x12m with two poles in the middle.", "The first pass after a win must break the line of two poles.", "The pass splits the poles", "The runner starts early", "A pass around the poles does not count", "The poles are closer together.", "A defender stands between the poles."),
        r("Far Mini", "SSG", "2v2", "Same End Line", "gates", 12, 20, 16, "3:1", 4, 2, 2, 0, 0, "20x16m with two mini goals on the same end line.", "Two mini goals face the same way, and the counter must use the far one.", "See the far goal before you pass", "The near goal is a trap", "The runner attacks the far post", "Either goal counts if the pass is forward.", "A defender recovers to the far goal."),
        r("Stay High", "SP", "Wide Player", "Into the Space", "overlap", 12, 24, 18, "3:1", 4, 4, 2, 0, 0, "24x18m. Four attack and two defend.", "The wide player stays high and the ball is played into the space in front of them.", "The wide player does not come short", "Play into the space", "The cross or shot is early", "The wide player may drop once.", "The defenders can counter-press for three seconds."),
        r("Third Touch", "SSG", "4v3", "Someone Else", "channel", 12, 28, 18, "3:1", 4, 4, 3, 0, 1, "28x18m to one goal.", "A goal counts only if a third player touched the ball after the tackle.", "The tackler does not finish", "The third player is the scorer", "The middle pass is forward", "The third player has one touch.", "A fourth defender recovers."),
        r("Hold Two", "SSG", "6v4", "Two Stay", "channel", 14, 32, 22, "4:1", 3, 6, 4, 0, 1, "32x22m to one goal.", "The rest of the team holds two players back while the front three attack.", "Two players are the rest defence", "The front three play quickly", "The rest defence does not join", "One of the two may join if the ball goes back.", "The four may counter to a mini goal."),
      ]),
    ],
    T2D: [
      eight("b-t2d-0", [
        r("Lost Call", "WU", "Pairs", "Sprint to the Ball", "gates", 8, 12, 12, "2:1", 6, 2, 0, 0, 0, "12x12m grid. Pairs passing.", "On the word lost, the passer sprints to the ball and the receiver shields it.", "The first step is toward the ball", "Shield with the body", "Arrive under control", "The receiver may turn.", "A third player joins the press."),
        r("Goal Side", "WU", "Fours", "Run Back to the Cone", "lanes", 8, 14, 12, "2:1", 6, 4, 0, 0, 0, "14x12m with a cone goal.", "The nearest player runs to the ball while the others run back to a cone goal.", "The nearest player goes", "The others get goal side", "Talk who is pressing", "The cone goal is further back.", "The press has four seconds."),
        r("Dropped Ball", "WU", "Pairs", "First There Presses", "square", 8, 12, 12, "2:1", 6, 2, 0, 0, 0, "12x12m. The coach drops a ball.", "Pairs react to a dropped ball and the first player there becomes the presser.", "React to the drop", "The first player presses", "The second player covers", "The coach drops the ball wider.", "Both players must touch the ball to score."),
        r("Cut the Lane", "TP", "Fours", "Block the Easy Pass", "square", 10, 15, 15, "3:1", 4, 4, 0, 0, 0, "15x15m square. Four players and one ball.", "When the pass is cut, one player presses and the friend blocks the easy lane.", "Body shape closes the easy lane", "One presser only", "The friend sees ball and lane", "The shape must be set in three seconds.", "Add a free player outside the square."),
        r("Three Seconds", "SP", "4v2", "Win it Inside", "rondo", 12, 15, 15, "3:1", 4, 4, 2, 0, 0, "15x15m square. Four outside and two inside.", "The team has three seconds to win the ball back inside the square after they give it away.", "React in the first second", "Win it inside the square", "If three seconds pass, stop", "Two seconds.", "The two inside can score in mini goals."),
        r("Nearest Three", "PoP", "6v4", "Rest Drop", "press", 12, 30, 20, "3:1", 4, 6, 4, 0, 0, "30x20m. Six attack and then lose the ball to four.", "After a loss, the nearest three run to the ball and the rest drop behind it.", "The nearest three go", "The rest get behind the ball", "Delay, do not all dive in", "Two players press and four drop.", "The four can score if they break the press."),
        r("Double Goal", "SSG", "5v5", "Before Recovery", "gates", 14, 30, 22, "4:1", 3, 5, 5, 0, 0, "30x22m with a goal at each end.", "A counter goal counts double if it comes before the losers have recovered behind the ball.", "Recover behind the ball", "The counter is the punishment", "Talk when the shape is set", "Any goal after recovery counts as one.", "The recovery must be four players."),
        r("Delay Set", "PoP", "7v5", "Jump Again", "press", 14, 36, 24, "4:1", 3, 7, 5, 0, 1, "36x24m to one goal.", "The three nearest players delay, and the block only jumps again once the rest are set.", "Delay first", "The block jumps together", "The keeper calls the set", "The delay lasts four seconds.", "One player may jump if the pass goes back."),
      ]),
      eight("b-t2d-1", [
        r("Chase the Cone", "WU", "Pairs", "On a Clap", "gates", 8, 12, 12, "2:1", 6, 2, 0, 0, 0, "12x12m with cones in the corners.", "Players pass in pairs and on a clap they both chase the cone nearest the ball.", "Chase the nearest cone", "The first there shields", "The partner covers", "The clap comes earlier.", "Three cones are live."),
        r("First Step", "WU", "Fours", "Even the Far Player", "square", 8, 14, 14, "2:1", 6, 4, 0, 0, 0, "14x14m square.", "The player farthest from the ball must still take a first step toward it.", "Everyone's first step is toward the ball", "The nearest player arrives first", "Then the far player recovers", "The far player must touch a cone on the way.", "Add a defender who can dribble away."),
        r("Safe Cone", "TP", "Threes", "Pass to Safety", "gates", 8, 14, 12, "2:1", 5, 3, 0, 0, 0, "14x12m with a safe cone.", "A tackle is not finished until the winner passes to a safe cone.", "Win it, then find the cone", "The safe cone is away from pressure", "The passer moves after the pass", "The cone is guarded.", "Two safe cones, and the player must choose."),
        r("Middle Cone", "TP", "Pairs", "Away from the Middle", "press", 10, 14, 12, "2:1", 5, 1, 1, 0, 0, "14x12m with a cone in the middle.", "The press shows the ball away from the middle cone.", "Show away from the middle", "Body shape does the work", "Do not reach across the cone", "The attacker can score by touching the cone.", "Start the press from further away."),
        r("Reset Grid", "SP", "4v1", "Ball Leaves, Stop", "square", 10, 16, 16, "3:1", 4, 4, 1, 0, 0, "16x16m grid.", "If the ball leaves the grid, the practice stops and the shape resets.", "Keep the ball in the grid", "Reset quickly when it leaves", "The press starts from the new shape", "The defender scores by kicking it out.", "The grid is smaller."),
        r("Last Player", "TP", "Five Players", "Shout the Recovery", "lanes", 10, 20, 14, "3:1", 4, 5, 0, 0, 0, "20x14m. Five players and one ball.", "The last player shouts the recovery while the front players press.", "The last player organises", "The front players press", "The shout names the side", "The last player may join if the ball goes back.", "No shout means the press does not count."),
        r("Five Second Gates", "SSG", "4v4", "Gates Behind", "gates", 12, 24, 18, "3:1", 4, 4, 4, 0, 0, "24x18m with two gates behind each team.", "Two gates behind the losers are live for five seconds after the loss.", "Know the gates are live", "Five seconds, then they close", "Recover or the gate is a goal", "Three seconds.", "Only one gate is live."),
        r("Backwards Jump", "PoP", "Line of Five", "Jump on the Back Pass", "press", 12, 30, 20, "3:1", 3, 5, 4, 0, 0, "30x20m. Five defend against four.", "A backwards pass is the signal for the whole line to jump together.", "Wait for the backwards pass", "The whole line jumps", "If the pass is forward, drop", "The jump is curved, not straight.", "A second trigger is a heavy touch."),
      ]),
    ],
  },
  Intermediate: {
    IP: [
      eight("i-ip-0", [
        r("Bounce Inside", "Rondo", "4v1", "Two Touch", "rondo", 10, 12, 12, "3:1", 4, 4, 1, 0, 0, "12x12m with one bounce player inside.", "Four players outside a square combine in two touches with a bounce player inside.", "Two touches", "The bounce player faces forward", "Play the free side", "One touch.", "The bounce player may be pressed."),
        r("Four Sides", "Rondo", "4v1", "All Four Sides", "rondo", 10, 14, 14, "3:1", 4, 4, 1, 0, 0, "14x14m square.", "A 4v1 scores when the ball travels through all four sides without a break.", "Change the side of the square", "Do not skip a side", "The defender works the nearest side", "The ball must visit each side twice.", "Add a second defender."),
        r("Lay and Spin", "SP", "Striker", "Mini Goal", "channel", 12, 20, 14, "3:1", 5, 3, 1, 0, 1, "20x14m to a mini goal.", "The striker checks, lays the ball, and spins for a shot into a mini goal.", "The check is sharp", "The lay is to the side", "Spin before the shot", "The shot is first time.", "A defender starts on the striker."),
        r("Ground Cross", "SP", "Five Players", "Along the Ground", "overlap", 12, 28, 18, "3:1", 4, 5, 2, 0, 1, "28x18m to one goal.", "Five players build to a winger who must cross along the ground.", "The cross is driven along the ground", "The runner attacks the near space", "The full-back stays connected", "The cross may bounce once.", "Add a recovering full-back."),
        r("Between Lines", "SSG", "4v2", "Then the Goal", "channel", 14, 24, 18, "3:1", 4, 4, 2, 0, 1, "24x18m with a line of cones and one goal.", "A 4v2 may shoot only after a pass that breaks the line of cones.", "Break the line before the shot", "The receiver is between the lines", "The two defenders stay compact", "The pass through is one touch.", "The cones move forward."),
        r("Cut Back", "SP", "6v3", "From the Byline", "channel", 14, 30, 22, "3:1", 4, 6, 3, 0, 1, "30x22m to one goal.", "Six players attack a back three and must finish from a cut-back.", "Reach the byline", "The cut-back is away from the keeper", "A cross to the near post does not count", "The finish is one touch.", "The back three can counter to a mini goal."),
        r("Both Targets", "SSG", "5v3", "Use Both Ends", "rondo", 16, 32, 22, "4:1", 3, 5, 3, 2, 0, "32x22m with a neutral on each end line.", "A 5v3 keeps two neutrals on the end lines and scores by using both in one move.", "Find one neutral, then the other", "The neutrals play one touch", "The three stay compact", "Remove one neutral.", "The three score by intercepting."),
        r("Through the Line", "PoP", "8v5", "Into the Striker", "channel", 16, 40, 30, "4:1", 3, 8, 5, 0, 1, "40x30m. Eight attack a line of five and a keeper.", "Eight outfield players play through a midfield line into a striker.", "Play through, not around", "The striker pins then spins", "Rest defence stays home", "The striker has two touches.", "The five can break to a mini goal."),
      ]),
      eight("i-ip-1", [
        r("Meet and Split", "TP", "Pairs", "One Two", "lanes", 10, 16, 10, "2:1", 6, 4, 0, 0, 0, "16x10m. Pairs each with a ball.", "Players in pairs dribble at each other and play a one-two before they meet.", "The one-two is early", "Change lane after the return", "Heads up before you meet", "The one-two is one touch.", "A cone blocks one lane."),
        r("Throw to Feet", "TP", "Keeper Start", "Face Forward", "channel", 10, 24, 16, "3:1", 4, 4, 0, 0, 1, "24x16m from a goal. A keeper and four outfield players.", "The keeper throws to a full-back, who must find a midfielder facing forward.", "The throw is to feet", "The midfielder is side-on", "The next pass is forward", "The throw is to the weak side.", "A defender presses the full-back."),
        r("Change Channel", "SP", "Fours", "Before the Shot", "lanes", 12, 24, 18, "3:1", 4, 4, 1, 0, 1, "24x18m split into three channels.", "Three channels are live and the ball must change channel before a shot.", "See the free channel", "The switch is on the ground", "Shoot only after the change", "The ball must visit all three channels.", "A defender locks one channel."),
        r("Side Target", "TP", "Targets", "Back Inside", "square", 12, 22, 18, "3:1", 4, 4, 0, 2, 0, "22x18m with a target on each side.", "A target player on each side is used, then the ball returns inside.", "Use the target, then come back in", "The target plays one touch", "The inside player is free", "Both targets must be used.", "A defender may mark one target."),
        r("Opposite Wing", "SP", "Pivot", "Half Turn", "channel", 14, 30, 24, "3:1", 4, 6, 2, 0, 0, "30x24m. A pivot, two wingers and two defenders.", "The pivot receives half-turned and plays the opposite winger.", "Receive on the half-turn", "The opposite winger stays wide", "Skip the near winger", "The pivot has one touch.", "The defenders can jump the pivot."),
        r("One Combine", "SSG", "6v4", "Spare Once", "channel", 14, 32, 24, "4:1", 3, 6, 4, 0, 1, "32x24m to one goal.", "A 6v4 attacks one goal and the spare players may only combine once.", "Find the spare player once", "Then the move is direct", "The four stay compact", "The spare player is one touch.", "Remove a spare player."),
        r("Third Runner", "PoP", "7v4", "Pull a Centre Back", "channel", 16, 36, 28, "4:1", 3, 7, 4, 0, 1, "36x28m to one goal.", "Players score by pulling a centre-back out and playing the third runner.", "The centre-back is pulled, not beaten", "The third runner is late", "The pass is in the space", "The third runner starts deeper.", "The four can score on the break."),
        r("Goal Kick Shape", "PoP", "8v6", "Cut Back Finish", "channel", 16, 50, 40, "4:1", 3, 8, 6, 0, 1, "Half pitch from a goal kick.", "The team builds from a goal-kick shape and enters the box with a cut-back.", "The goal kick finds the free player", "Width before the box", "The finish is a cut-back", "The goal kick is to the weak side.", "The six start one line higher."),
      ]),
    ],
    OOP: [
      eight("i-oop-0", [
        r("Arrive Side On", "TP", "Two Defenders", "One Gate", "press", 10, 12, 10, "2:1", 6, 1, 2, 0, 0, "12x10m with one gate.", "Two defenders protect one gate and must arrive side-on.", "Side-on on arrival", "One presses, one covers", "The gate is the prize", "The attacker has a two-touch limit.", "The cover starts in the gate."),
        r("Tuck In", "WU", "Back Three", "Ball Central", "lanes", 10, 20, 16, "2:1", 5, 1, 3, 0, 0, "20x16m. A back three and a server.", "A back three slide and the wide defender tucks in when the ball goes central.", "Slide together", "The wide player tucks in", "Distances stay short", "The ball can be switched.", "Add a striker to pin the middle player."),
        r("Poor Touch", "SP", "4v2+GK", "Jump on the Touch", "press", 12, 24, 18, "3:1", 4, 2, 4, 0, 1, "24x18m. Four press a keeper and two.", "Four press a goalkeeper and two, and they jump only on a poor first touch.", "Wait for the poor touch", "Then the whole line jumps", "Recover in a line if it breaks", "A backwards pass is a second trigger.", "The two can score in a mini goal."),
        r("Onto the Striker", "PoP", "Line of Four", "Leave the Centre Back", "press", 12, 30, 24, "3:1", 4, 5, 4, 0, 1, "30x24m. Four midfielders defend against five and a keeper.", "The midfield line steps onto the striker and leaves the centre-back free.", "Step onto the striker", "The centre-back is not the press", "Cover the bounce", "The striker can drop.", "The five have eight seconds to play through."),
        r("Counter Goal", "SSG", "4v3", "Win and Score", "channel", 14, 28, 20, "3:1", 4, 3, 4, 0, 1, "28x20m with a goal and a counter goal.", "A 4v3 defends a goal and scores in a counter goal if they win the ball.", "Defend first", "The counter goal is the reward", "The win must be clean", "The counter has five seconds.", "The three can combine before the shot."),
        r("Not the Corner", "PoP", "Five Defend", "Stay Central", "channel", 14, 32, 24, "4:1", 3, 5, 5, 0, 1, "32x24m to one goal.", "Five defend a low block and may not be pulled to the corner.", "The corner is a trap", "Protect the centre", "The wide player tucks in", "A cross from the corner does not count as a chance.", "The five may step if the ball goes back."),
        r("Track the Overlap", "SP", "Winger and Back", "Stay Inside", "overlap", 14, 30, 20, "3:1", 4, 2, 2, 0, 0, "30x20m channel.", "The winger tracks the overlap and the full-back stays inside.", "The winger goes with the runner", "The full-back does not follow wide", "The pass inside is the one to stop", "The overlap starts higher.", "Add a second overlapping runner."),
        r("Attack the Cross", "PoP", "Back Four", "Near Post", "corner", 16, 40, 30, "4:1", 3, 5, 6, 0, 1, "40x30m with crosses from both sides.", "A back four and two midfielders defend crosses and attack the near post.", "Attack the near post", "The far post stays zonal", "The keeper calls the cross", "The cross is cut back instead.", "One attacker starts at the back post."),
      ]),
      eight("i-oop-1", [
        r("Switch Roles", "TP", "Defender and Shadow", "On the Turn", "press", 10, 12, 10, "2:1", 6, 1, 2, 0, 0, "12x10m lane.", "The defender and a shadow partner switch roles when the attacker turns.", "Switch as the attacker turns", "The new presser is already close", "The old presser becomes cover", "The attacker may turn twice.", "The shadow starts goal side."),
        r("Cover Behind", "SP", "1v1 plus Cover", "From Behind", "channel", 10, 16, 10, "2:1", 6, 1, 2, 0, 0, "16x10m lane.", "Players defend 1v1 in a lane and a second defender starts as cover from behind.", "The cover is deeper", "The 1v1 does not dive in", "Show the lane, not the middle", "The cover may tackle if the 1v1 is beaten.", "The attacker starts with the ball at their feet."),
        r("Lock the Switch", "SP", "Press Trap", "Far Player Locks", "press", 12, 24, 20, "3:1", 4, 4, 4, 0, 1, "24x20m. Four press four and a keeper.", "The press traps one side and the far player locks the switch.", "Jump one side only", "The far player denies the switch", "Recover together if the lock breaks", "The trap starts on a backwards pass.", "The four in possession have a free player."),
        r("Zonal Box", "PoP", "Box of Four", "Keeper Owns Six", "corner", 12, 20, 20, "3:1", 4, 3, 4, 0, 1, "20x20m box with crosses.", "A zonal box deals with a cross and the keeper claims anything to the six-yard line.", "Zone, do not follow the run", "The keeper is loud", "Attack the ball", "The cross is from a shorter angle.", "One attacker is unmarked on purpose."),
        r("Which Goal", "SSG", "Three Defend Two", "Talk the Leave", "gates", 12, 22, 16, "3:1", 4, 3, 3, 0, 0, "22x16m with two goals.", "Three players defend two goals and must say which goal they are leaving.", "Name the goal you leave", "The other two protect the live goal", "Change the call if the ball switches", "A wrong call is a goal.", "The attackers have one touch."),
        r("Six Then Drop", "PoP", "High Line", "Drop if Not Won", "press", 14, 36, 28, "3:1", 3, 6, 6, 0, 1, "36x28m. Six press six.", "The line holds a high press for six seconds, then drops if the ball is not won.", "Six seconds is the rule", "Drop together", "The keeper sets the new line", "Four seconds.", "A win inside the count starts a counter."),
        r("Gate After Tackle", "SP", "Win and Play", "Four Seconds", "gates", 12, 20, 16, "3:1", 5, 3, 3, 0, 0, "20x16m with a gate behind the attackers.", "Defenders score by playing through a gate within four seconds of the tackle.", "Win it and look for the gate", "Four seconds", "The pass is forward", "The gate is narrower.", "The attackers can counter-press."),
        r("Slide as One", "PoP", "Back Four", "Cover the Step", "lanes", 14, 40, 30, "4:1", 3, 6, 4, 0, 1, "40x30m. A back four and two midfielders.", "The block slides as one and the far centre-back covers the space behind the step.", "Slide on the same cue", "The far centre-back covers", "Do not leave the space in behind", "The step is only on a backwards pass.", "The attackers look for the space in behind."),
      ]),
    ],
    T2A: [
      eight("i-t2a-0", [
        r("Into a Hoop", "SP", "3v2", "First Pass Forward", "gates", 10, 16, 12, "3:1", 6, 3, 2, 0, 0, "16x12m with a hoop beyond the defenders.", "Win the ball in a 3v2 and the first pass has to go forward into a hoop.", "The hoop is the target", "The pass is first time", "A square pass does not count", "The hoop is moving.", "The two can score in a mini goal."),
        r("One Shot", "SP", "2v1", "Ends After the Shot", "channel", 10, 18, 12, "3:1", 6, 2, 1, 0, 1, "18x12m to one goal.", "A 2v1 starts the moment the tackle is made and ends after one shot.", "Tackle, then go", "One shot only", "The partner makes the run", "The shot must be inside the box.", "The defender starts goalside."),
        r("Camped Player", "SP", "4v2", "Find the Camp", "channel", 12, 24, 16, "3:1", 5, 4, 2, 0, 0, "24x16m with a player camped between two cones.", "The regaining team has a player already camped between two cones and must find them.", "The camped player stays", "The pass is into the camp", "Then the camped player sets", "The camped player may move one step.", "A defender marks the camp."),
        r("No Square Twice", "SSG", "4v3", "Two Goals", "gates", 12, 26, 18, "3:1", 4, 4, 3, 0, 0, "26x18m with a goal at each end.", "Four attack two goals and the counter is dead if it goes square twice.", "Forward or the move dies", "Choose a goal early", "The third player is the runner", "One square pass is allowed.", "The three can recover one player."),
        r("Far Post Runner", "SP", "5v3", "Cross from the Wing", "overlap", 14, 32, 22, "3:1", 4, 5, 3, 0, 1, "32x22m. The ball is won on the wing.", "The ball is won on the wing and the cross is attacked by the far-post runner.", "Win it wide and look far", "The far runner starts early", "The near post is a decoy", "The cross is driven.", "A full-back recovers to the far post."),
        r("Five Metres Back", "SP", "3v1", "Recovering Defender", "channel", 12, 24, 14, "3:1", 5, 3, 1, 0, 1, "24x14m. The defender starts five metres behind the ball.", "Three players break against a recovering defender who starts five metres behind the ball.", "Play before the defender arrives", "The widest runner stays high", "Finish first time", "The defender starts closer.", "A second defender joins late."),
        r("Weak Side First", "PoP", "5v4", "Use the Far Player", "channel", 14, 36, 28, "4:1", 3, 5, 4, 0, 1, "36x28m to one goal.", "A 5v4 counter must use the weak-side player before the shot.", "Find the weak side", "The ball-side player is the decoy", "The shot comes after the switch", "The weak-side player has one touch.", "The four can counter-press for three seconds."),
        r("Seven Seconds", "PoP", "7v4", "Space in Front", "channel", 16, 40, 30, "4:1", 3, 7, 4, 0, 1, "40x30m. Seven attack the space in front of a back four.", "Seven attack the space in front of a back four and the move ends after seven seconds.", "Play into the space", "Seven seconds", "Two players stay back", "Five seconds.", "The back four score in a mini goal if they break."),
      ]),
      eight("i-t2a-1", [
        r("Painted Corner", "SP", "Pairs", "Run It In", "gates", 8, 14, 12, "2:1", 6, 2, 1, 0, 0, "14x12m with a painted corner.", "After a steal, the player runs the ball into a painted corner rather than passing.", "Drive into the corner", "The partner clears the path", "A pass ends the turn", "The corner is smaller.", "The defender may tackle."),
        r("Bouncing Target", "TP", "Threes", "Set First Time", "square", 10, 16, 12, "3:1", 5, 3, 0, 1, 0, "16x12m with a bouncing target.", "The forward pass is played into a bouncing target who sets it first time.", "The target is the extra player", "The set is first time", "The runner takes the set in stride", "The target may move.", "A defender stands on the target."),
        r("Run Before Contact", "SP", "Third Man", "Start Early", "channel", 12, 22, 14, "3:1", 5, 3, 1, 0, 0, "22x14m.", "A third-man run starts before the tackle is completed.", "The run is early", "The pass meets the run", "The tackler does not look down", "The third player starts level.", "The defender can step into the run."),
        r("Who Did Not Press", "SSG", "4v3", "Find the Free Player", "square", 12, 24, 18, "3:1", 4, 4, 3, 0, 0, "24x18m with two goals.", "The counter uses the player who did not press.", "The pressers stay, the free player goes", "The pass leaves the pressure", "Then attack the goal", "The free player must call.", "All four may join if the pass goes back."),
        r("Stacked Goals", "SSG", "3v2", "Choose the Far Post", "gates", 12, 20, 16, "3:1", 4, 3, 2, 0, 0, "20x16m with two goals stacked on one end line.", "Two goals are stacked on one end line so the counter chooses the far post.", "See both goals", "The far post is the finish", "The near goal pulls the defender", "The near goal also counts from a cut-back.", "A recovering player protects the far post."),
        r("Switch Counts", "SP", "4v2", "Not the Dribble", "channel", 14, 28, 20, "3:1", 4, 4, 2, 0, 0, "28x20m.", "The switch after the regain is the pass that counts, not the first dribble.", "Win it and switch", "The dribble does not score", "The far player is waiting", "The switch is one touch.", "The two can intercept the switch."),
        r("Not All Join", "SSG", "5v4", "Rest Defence Stays", "channel", 14, 32, 24, "4:1", 3, 5, 4, 0, 1, "32x24m to one goal.", "A goal is cancelled if the rest defence all joined the attack.", "Leave the rest defence", "The attack is still fast", "A cancelled goal is restarted", "One rest player may join.", "The four break at the rest defence."),
        r("Last Cone", "PoP", "6v4", "In Behind", "channel", 16, 40, 28, "4:1", 3, 6, 4, 0, 1, "40x28m. The striker starts on the last cone.", "The striker stays on the last cone and is found in behind, not to feet.", "The pass is in behind", "The striker does not come short", "Time the run with the pass", "The striker may check once.", "The back four drop sooner."),
      ]),
    ],
    T2D: [
      eight("i-t2d-0", [
        r("Hunt for Three", "Rondo", "4v2", "After Each Loss", "rondo", 10, 12, 12, "3:1", 4, 4, 2, 0, 0, "12x12m. Four keep the ball against two.", "Four players keep the ball and the two in the middle hunt it for three seconds after each loss.", "Three seconds of hunting", "The nearest outside player jumps", "Then the shape returns", "The hunt is one second longer.", "The two score by keeping it."),
        r("Get Goal Side", "SP", "1v1", "Chase Until Goalside", "channel", 10, 14, 8, "2:1", 6, 1, 1, 0, 0, "14x8m lane to a line.", "The loser of the 1v1 must chase until they are goalside again.", "Turn and chase at once", "Get goalside before you tackle", "Do not run beside the ball", "The attacker may slow down.", "A second attacker joins."),
        r("Rondo Press", "Rondo", "4v2", "Instant Press", "rondo", 12, 15, 15, "3:1", 4, 4, 2, 0, 0, "15x15m square.", "A 4v2 rondo becomes a press the instant the ball is turned over.", "The press starts on the turnover", "One jumps, the others cut lanes", "Win it or stop", "The two must combine to escape.", "Add a mini goal for the two."),
        r("Cut Square", "TP", "Five Players", "Nearest Plus Two", "square", 10, 16, 16, "3:1", 4, 5, 0, 0, 0, "16x16m. Five players and one ball.", "The nearest player presses and two others cut the square passes.", "Press the ball", "The next two kill the square pass", "The other two recover", "The press is three seconds.", "A sixth player is the free outlet."),
        r("Score the Shape", "PoP", "5v5", "Coach Stops Play", "press", 12, 30, 24, "3:1", 4, 5, 5, 0, 0, "30x24m. The coach stops the game on the turnover.", "A 5v5 stops on the turnover and the coach scores the shape if it is right within three seconds.", "Freeze in the right shape", "One on the ball, others on lanes", "The coach is the referee of the shape", "The shape must include a cover player.", "Play on if the shape is right."),
        r("Then the Block", "PoP", "6v5", "Four Seconds", "press", 14, 36, 28, "4:1", 3, 6, 5, 0, 1, "36x28m.", "The counter-press lasts four seconds and then the team must be in a midfield block.", "Four seconds of press", "Then a block, not a chase", "The keeper sets the line", "Three seconds.", "The five score if they play through the block."),
        r("Pivot Protects", "PoP", "7v5", "Centre Circle", "press", 14, 40, 30, "4:1", 3, 7, 5, 0, 0, "40x30m with a centre circle.", "The three players nearest the loss hunt the ball while a pivot protects the centre circle.", "The pivot does not hunt", "The three hunt", "The centre is protected", "The pivot may step if the ball goes back.", "The five attack the circle."),
        r("Goalside First", "PoP", "8v6", "Do Not Dive", "press", 16, 50, 40, "4:1", 3, 8, 6, 0, 1, "Half pitch.", "The rest defence delays the counter and does not dive in until a teammate is goalside.", "Delay", "Wait for a teammate goalside", "Then the jump is together", "The counter has six seconds.", "The six score in the big goal if the delay fails."),
      ]),
      eight("i-t2d-1", [
        r("Nearest Cone", "WU", "Pairs", "Bad Pass", "gates", 8, 14, 12, "2:1", 6, 2, 0, 0, 0, "14x12m with cones around the pair.", "On a bad pass, both players of the pair sprint to the cone the ball is nearest.", "React to the bad pass", "The nearer player arrives first", "The other covers", "The coach plays the bad pass.", "Three cones are in play."),
        r("Shout the Side", "TP", "Press and Cover", "Curved Run", "press", 10, 14, 10, "2:1", 6, 1, 2, 0, 0, "14x10m lane.", "The presser curves the run and the cover player shouts the side.", "Curve the press", "The shout names the side", "Cover sees both", "The attacker can go the other way if the shout is late.", "Cover starts further away."),
        r("Three Pass Escape", "Rondo", "4v2", "Keep It to Score", "rondo", 12, 14, 14, "3:1", 4, 4, 2, 0, 0, "14x14m.", "If the defenders in the rondo keep the ball for three passes, they score.", "Win it, then keep it", "Three passes is the score", "The four must counter-press", "Two passes is enough.", "The four have mini goals."),
        r("High or Deep", "PoP", "6v4", "Two Cues", "press", 12, 32, 24, "3:1", 4, 6, 4, 0, 1, "32x24m.", "A high regain is the cue to counter-press, and a deep loss is the cue to drop.", "Read where the ball was lost", "High loss, press", "Deep loss, drop", "The coach can call the cue.", "The four break if the cue is wrong."),
        r("Keeper Organises", "SSG", "5v4+GK", "Front Two Press", "press", 14, 30, 22, "3:1", 3, 4, 5, 0, 1, "30x22m with a keeper.", "The goalkeeper organises two recovering players while the front two press.", "The keeper is the voice", "Two press, two recover", "The shape is set before a second jump", "The keeper may leave the line to claim.", "The four attack the goal if the press breaks."),
        r("Down the Side", "PoP", "6v5", "Protect the Middle", "channel", 14, 36, 26, "4:1", 3, 6, 5, 0, 1, "36x26m.", "The team shows the counter down the side and protects the middle lane.", "Show the side", "The middle lane has a player", "Do not dive in centrally", "The side is closed after four seconds.", "The five can score through the middle."),
        r("Four Behind", "PoP", "7v5", "Failed Press", "press", 14, 40, 30, "4:1", 3, 7, 5, 0, 0, "40x30m.", "A failed counter-press must end with four players behind the ball.", "Know when the press has failed", "Four get behind the ball", "The others delay the counter", "Three behind the ball is not enough.", "The five attack until the four are set."),
        r("Jump Backwards", "11v11", "Two Teams", "Only Backwards", "press", 16, 60, 40, "2:1", 2, 8, 8, 0, 2, "60x40m. Both teams in a match shape.", "The line jumps only when the first pass of the counter is backwards.", "Read the first pass", "Backwards, the line jumps", "Forwards, the line drops", "A heavy touch is a second cue.", "The counter has six seconds."),
      ]),
    ],
  },
  Professional: {
    IP: [
      eight("p-ip-0", [
        r("Break to a Runner", "PoP", "6v4", "Line Break", "channel", 12, 28, 20, "3:1", 4, 6, 4, 0, 0, "28x20m. Six attack four.", "Six attack four on a short pitch and a point is a pass that breaks the line into a runner.", "The pass breaks the line", "The runner is timed", "A pass to feet does not score", "The runner starts onside.", "The four can counter to a mini goal."),
        r("Keeper Wave", "PoP", "7v5", "Cut Back", "channel", 14, 40, 30, "4:1", 3, 7, 5, 0, 1, "Half of a small pitch from the keeper.", "A wave builds from the keeper and finishes with a cut-back.", "Build past the first line", "The byline is the aim", "The cut-back finds the late runner", "The keeper starts the wave with a throw.", "The five step up earlier."),
        r("Between the Lines", "PoP", "8v6", "Mid Block", "press", 16, 50, 40, "4:1", 3, 8, 6, 0, 1, "Half pitch. Eight against a mid-block of six.", "Eight play through a mid-block of six and score by finding the player between the lines.", "Find the player between the lines", "The block is not pulled apart", "Play forward when the picture is on", "The player between the lines has one touch.", "The block starts higher."),
        r("Underlap", "PoP", "Winger and Back", "Half Space", "overlap", 14, 36, 28, "3:1", 4, 6, 3, 0, 1, "36x28m channel to one goal.", "The winger stays wide and the full-back underlaps into the half-space.", "The winger holds the width", "The underlap is the pass", "The finish comes from the half-space", "The winger may come inside once.", "A defender tracks the underlap."),
        r("Before the Shot", "PoP", "9v7", "Break Then Shoot", "channel", 16, 50, 40, "4:1", 3, 9, 7, 0, 1, "Three-quarter pitch. Nine against seven.", "A 9v7 must break the block before anyone shoots.", "No shot before the break", "The free player is found early", "Rest defence is counted", "The shot must follow a line-breaking pass.", "The seven can score on the counter."),
        r("Pin Not Drop", "PoP", "Goal Kick", "Striker Pins", "channel", 16, 50, 40, "4:1", 3, 9, 7, 0, 1, "Half pitch from a goal kick.", "The team plays a goal-kick pattern and the striker must pin, not drop.", "The striker pins the centre-back", "The midfielder receives between the lines", "The goal kick finds the free side", "The striker may drop once per wave.", "The seven press the goal kick."),
        r("Three Touch Game", "SSG", "6v6+2", "Two Neutrals", "rondo", 16, 36, 28, "4:1", 3, 6, 6, 2, 0, "36x28m with two neutrals between the lines.", "A positional game uses two neutrals between the lines and three touches maximum.", "Three touches", "The neutrals are between the lines", "Switch if the press comes", "Two touches.", "Remove one neutral."),
        r("Count Rest Defence", "11v11", "Full Shape", "Before the Switch", "channel", 18, 80, 50, "2:1", 2, 10, 10, 0, 2, "Most of a full pitch. Both teams in shape.", "The full team attacks a mid-block and rest defence is counted before every switch.", "Count the rest defence out loud", "Then switch", "The block is broken by the third player", "A switch without rest defence is pulled back.", "The block defends deeper."),
      ]),
      eight("p-ip-1", [
        r("Half Turn Pivot", "TP", "Pivot", "Forward or Set", "square", 10, 14, 12, "3:1", 5, 4, 1, 0, 0, "14x12m with two cones around the pivot.", "The pivot receives on the half-turn between two cones and plays forward or sets back.", "Half-turn body shape", "Forward if it is on", "Set back if it is not", "The set is one touch.", "The defender starts tighter."),
        r("Back Three Free", "PoP", "Back Three", "Wide Centre Back", "lanes", 14, 36, 28, "4:1", 3, 7, 5, 0, 1, "36x28m. A back three builds against five.", "Build-up uses a back three and the wide centre-back is the free player.", "The wide centre-back is free", "The pivot connects", "Play the free player early", "The wide centre-back may dribble out.", "The five press one side."),
        r("Rotate the Line", "PoP", "Midfielder Drops", "Full Back On", "overlap", 14, 40, 30, "4:1", 3, 8, 6, 0, 1, "40x30m.", "The midfielder drops into the back line and the full-back pushes on.", "The drop creates the free player", "The full-back goes on", "The winger holds width", "The midfielder stays high instead.", "A defender follows the full-back."),
        r("Half Space Third", "PoP", "8v6", "Third Man", "channel", 16, 44, 34, "4:1", 3, 8, 6, 0, 1, "44x34m to one goal.", "An 8v6 scores only from a third-man combination in the half-space.", "The half-space is the lane", "The third player is late", "A cross does not count", "The third player starts outside.", "The six protect the half-space."),
        r("Switch Early", "PoP", "9v7", "Before the Check", "channel", 16, 50, 40, "4:1", 3, 9, 7, 0, 1, "50x40m.", "The switch is played early, before the winger has checked inside.", "Switch before the check", "The winger stays wide", "The ball travels in front of them", "The winger may check if the switch is late.", "The seven jump the switch."),
        r("Three at Home", "PoP", "Overlap Rule", "Rest of Three", "overlap", 14, 40, 32, "4:1", 3, 8, 5, 0, 1, "40x32m to one goal.", "Set a rest defence of three before the full-back overlaps.", "Three stay", "Then the full-back goes", "The overlap is the cross or the cut-back", "Two at home is not enough.", "The five counter at the rest defence."),
        r("Late Box Run", "PoP", "Striker Pins", "Midfielder Arrives", "channel", 16, 40, 30, "4:1", 3, 7, 4, 0, 1, "40x30m to one goal.", "The striker pins the centre-back and the midfielder arrives late in the box.", "Pin first", "The midfielder's run is late", "The pass is in the space", "The midfielder starts higher.", "The four can step up."),
        r("Byline Cut", "11v11", "Rehearsed Pattern", "Not the Near Post", "corner", 18, 70, 50, "2:1", 2, 10, 9, 0, 1, "70x50m to one goal.", "A rehearsed pattern ends with a cut-back from the byline, not a cross to the near post.", "Reach the byline", "Cut the ball back", "The near-post cross is restarted", "The pattern starts from a throw.", "The nine defend with a low block."),
      ]),
    ],
    OOP: [
      eight("p-oop-0", [
        r("Only Backwards", "PoP", "7v8", "Step on the Back Pass", "press", 14, 40, 30, "4:1", 3, 8, 7, 0, 1, "40x30m. Seven defend against eight.", "Seven defend in a mid-block against eight and step out only on a backwards pass.", "Wait for the backwards pass", "The step is together", "Force play wide", "A heavy touch is also a trigger.", "The eight have ten seconds to break a line."),
        r("Show Wide", "PoP", "Back Four Plus", "Width of the Box", "lanes", 14, 36, 30, "4:1", 3, 6, 5, 0, 1, "36x30m to one goal.", "A back four and a pivot protect the width of the box and show play wide.", "The box stays narrow", "Show the wide pass", "The pivot protects the middle", "The wide player may jump.", "The attackers score only from a central pass."),
        r("First Pass Trap", "PoP", "High Press", "One Side", "press", 14, 40, 32, "3:1", 4, 6, 6, 0, 1, "40x32m. Six press a keeper and five.", "The press jumps on the goalkeeper's first pass and traps one side.", "The first pass is the trigger", "Trap one side", "The far side is locked", "Recover in a line if the trap breaks.", "The five can play into a mini goal."),
        r("Six Yard Call", "PoP", "Zonal Box", "Keeper Owns It", "corner", 12, 30, 24, "3:1", 4, 4, 5, 0, 1, "30x24m box.", "Zonal marking in the box, and the keeper owns the six-yard area.", "Zone the runners", "The keeper is first in the six-yard box", "Attack the ball", "The cross is a cut-back.", "One runner starts on the keeper."),
        r("Broken Press Line", "PoP", "7v6", "Recover in a Line", "press", 14, 36, 28, "3:1", 4, 6, 7, 0, 1, "36x28m.", "A 7v6 high press traps the build on one side and recovers in a line if it is broken.", "Trap one side", "If it breaks, recover together", "The line faces the ball", "The recovery is sprint, then set.", "The six score if they play through the recovering line."),
        r("Weak Side Full", "PoP", "Low Block", "Arrive Late", "corner", 16, 40, 32, "4:1", 3, 6, 6, 0, 1, "40x32m defending cut-backs.", "The low block deals with a cut-back and the weak-side full-back must arrive.", "The weak-side full-back arrives", "The near side attacks the ball", "The keeper claims what they can", "The cut-back is pulled back further.", "An extra runner starts at the back post."),
        r("Zone the Rest", "PoP", "Near Post Mark", "Mixed Box", "corner", 14, 28, 24, "3:1", 4, 4, 5, 0, 1, "28x24m box.", "Man-mark the near-post runner and zone the rest of the box.", "The near-post runner is marked", "Everyone else zones", "Attack the cross", "The near-post runner starts wider.", "Two runners attack the near post."),
        r("Delay the Counter", "11v11", "Protect a Lead", "Three Nearest", "press", 18, 80, 54, "2:1", 2, 11, 11, 0, 2, "Most of a full pitch.", "The team defends a lead with a mid-block and the counter is delayed by the three nearest.", "The three nearest delay", "The block stays compact", "Do not dive in", "The three may jump on a backwards pass.", "The counter has six seconds."),
      ]),
      eight("p-oop-1", [
        r("Only One Jumps", "WU", "Line of Three", "Ball Side", "lanes", 10, 18, 14, "2:1", 5, 1, 3, 0, 0, "18x14m. A line of three and a server.", "The line of three slides across and the ball-side player is the only one allowed to jump.", "Slide first", "Only the ball-side player jumps", "The others cover", "The server can switch.", "The jump is delayed by one second."),
        r("Lock Inside", "SP", "Full Back", "Cover the Underlap", "overlap", 12, 24, 18, "3:1", 4, 2, 2, 0, 0, "24x18m channel.", "Cover the underlap by locking the full-back inside the width of the box.", "The full-back stays inside", "The winger takes the overlap", "The pass into the underlap is the one to stop", "The full-back may follow if the ball is played early.", "A second underlap starts late."),
        r("Step as One", "PoP", "Press the Long Ball", "Back Line Up", "press", 14, 40, 30, "3:1", 3, 6, 6, 0, 1, "40x30m.", "A pressing trap forces the long ball and the back line steps up together.", "Force the long ball", "The line steps as one", "The keeper claims or the line wins the header", "The trap is on the weak side.", "The long ball is played earlier."),
        r("Second Ball", "PoP", "After the Clear", "Win the Next One", "corner", 12, 30, 24, "3:1", 4, 5, 5, 0, 1, "30x24m. Clears from a cross.", "Defenders score by winning the second ball after a clearance.", "The first clear is wide", "The second ball is the prize", "Someone attacks the clearance", "The second ball must be headed.", "The attackers are set for the second ball."),
        r("Front Five Press", "PoP", "Rest Behind", "While They Press", "press", 14, 44, 34, "4:1", 3, 8, 7, 0, 1, "44x34m.", "The rest defence is set while the front five still press.", "The front five press", "Three are already rest defence", "The press does not pull the rest", "The rest defence may step if the ball goes back.", "The seven look for the space behind the press."),
        r("Far Post Zone", "PoP", "Cross Defence", "Near Post Attack", "corner", 14, 32, 26, "3:1", 4, 5, 5, 0, 1, "32x26m box.", "A cross is attacked at the near post and the far post stays zonal.", "Attack the near post", "Zone the far post", "The keeper decides", "The cross is whipped.", "An extra attacker starts at the far post."),
        r("Higher Each Time", "PoP", "Start Line", "On a Square Pass", "press", 14, 40, 32, "4:1", 3, 7, 6, 0, 1, "40x32m.", "The block starts one line higher each time the opponents play square.", "See the square pass", "The next line is higher", "Distances stay the same", "A forward pass drops the line.", "The six try to play through the higher line."),
        r("Free Kick Then Press", "11v11", "Set then Hunt", "Collapse Forward", "corner", 16, 50, 40, "2:1", 3, 8, 8, 0, 1, "50x40m from a free-kick shape.", "The team defends a free-kick shape and then collapses into the counter-press.", "Defend the kick first", "The second ball starts the press", "The nearest players go", "The press lasts five seconds.", "The attack has a short free-kick option."),
      ]),
    ],
    T2A: [
      eight("p-t2a-0", [
        r("Secure Then Go", "PoP", "5v3", "Back to the Keeper", "channel", 12, 30, 20, "3:1", 4, 5, 3, 0, 1, "30x20m. The ball is won high.", "After the tackle, the ball is played back to a keeper and the attack starts again only once the team is set.", "Secure first", "The keeper starts the attack", "Then the runs go", "The keeper has two touches.", "The three can press the keeper."),
        r("Before the Box", "SP", "4v2", "Recovering Player", "channel", 12, 28, 18, "3:1", 5, 4, 2, 0, 1, "28x18m. A recovering defender starts outside the box.", "A 4v2 break must be finished before a recovering defender enters the box.", "Finish before the recovery", "The furthest runner stays onside", "The pass is forward", "The recovering player starts closer.", "A second recovering player joins."),
        r("Weak Side Rest", "PoP", "6v4", "Ball Side Stays", "channel", 14, 36, 28, "4:1", 3, 6, 4, 0, 1, "36x28m to one goal.", "The counter uses the weak side, and the ball-side winger stays as rest defence.", "The weak side is the attack", "The ball-side winger stays", "The switch is early", "The winger may join after the shot.", "The four hunt the switch."),
        r("Square Resets", "SSG", "5v4", "Eight Second Count", "gates", 14, 32, 24, "3:1", 4, 5, 4, 0, 1, "32x24m with two goals.", "The team has eight seconds to score, and a square pass resets the count.", "Forward keeps the count", "A square pass starts it again", "Choose the goal quickly", "Six seconds.", "The four leave two as rest defence."),
        r("Behind the Back", "PoP", "6v4", "Winger in Space", "overlap", 14, 40, 30, "4:1", 3, 6, 4, 0, 1, "40x30m.", "The switch after the regain finds the winger in the space behind the full-back.", "The winger attacks the space", "The pass is in behind", "The full-back is pinned wide", "The winger must stay onside.", "The full-back drops sooner."),
        r("Eight Attack", "PoP", "8v5", "Three Stay Home", "channel", 16, 50, 40, "4:1", 3, 8, 5, 0, 1, "50x40m to the far goal.", "A three-player rest defence holds while eight attack the far goal.", "Three stay", "Eight play forward", "The rest defence does not get pulled", "Two stay if the ball goes back.", "The five counter at the three."),
        r("Worth Two", "PoP", "7v5", "Break the First Line", "channel", 16, 44, 34, "4:1", 3, 7, 5, 0, 1, "44x34m to one goal.", "The goal from the counter is worth two if the assist broke the first line.", "The assist breaks the line", "Then the finish is simple", "A goal from a bounce is one", "The first line steps up.", "The five can score one in a mini goal."),
        r("Picture On", "11v11", "Win Secure Split", "Or the Counter Ends", "channel", 18, 70, 50, "2:1", 2, 10, 10, 0, 2, "70x50m in match shapes.", "Win the ball, secure to the pivot, then the first forward pass splits the centre-backs or the counter is over.", "Secure to the pivot", "Split only if the picture is on", "If it is not on, the counter ends", "The pivot has one touch.", "The ten drop into a mid-block."),
      ]),
      eight("p-t2a-1", [
        r("Not Allowed Short", "SP", "4v2", "Pass in Behind", "channel", 12, 24, 16, "3:1", 5, 4, 2, 0, 0, "24x16m. The furthest player stays high.", "The furthest player is not allowed to come short, so the pass must be played in behind.", "The furthest player stays", "The pass is in behind", "A pass to feet is restarted", "The furthest player may check once.", "The two drop off."),
        r("Keeper Throw", "PoP", "5v3", "Won in Midfield", "channel", 12, 32, 22, "3:1", 4, 5, 3, 0, 1, "32x22m. The ball is won in midfield.", "A throw from the keeper starts the transition once the ball is won in midfield.", "Win it and find the keeper's throw", "The throw starts the runs", "Attack the space", "The throw is into the full-back.", "The three press the throw."),
        r("Same End Line", "SSG", "4v3", "Choose Weak", "gates", 12, 24, 18, "3:1", 4, 4, 3, 0, 0, "24x18m with two goals on the same end line.", "Two goals on the same end line force the attack to choose the weak side.", "The weak-side goal is the score", "The near goal pulls a defender", "The pass chooses early", "Either goal counts after a cut-back.", "A defender recovers to the weak goal."),
        r("Beyond Before", "SP", "Threes", "Run Then Pass", "channel", 12, 26, 16, "3:1", 5, 3, 1, 0, 0, "26x16m.", "The runner goes beyond the ball before it is played.", "The run is first", "The pass meets it", "Do not pass to feet", "The runner starts level with the ball.", "A defender tracks the run."),
        r("Cut Back Only", "PoP", "6v4+GK", "No Cross", "channel", 14, 36, 26, "4:1", 3, 6, 4, 0, 1, "36x26m to one goal.", "A 6v4 finishes with a cut-back, and the cross is not allowed.", "Reach the byline", "Cut it back", "A cross is restarted", "The cut-back is first time.", "The four protect the cut-back zone."),
        r("Two May Not Join", "PoP", "8v5", "Rest of Two", "channel", 16, 44, 34, "4:1", 3, 8, 5, 0, 1, "44x34m.", "A rest defence of two stays, and they may not join even if the attack is short of numbers.", "Two stay whatever happens", "The attack plays without them", "A join cancels the goal", "One may join if the ball goes back.", "The five attack the two."),
        r("Coach Stops It", "PoP", "7v4", "Rest Pulled Out", "channel", 14, 40, 30, "4:1", 3, 7, 4, 0, 1, "40x30m.", "The counter is stopped by the coach if the rest defence is pulled out.", "The rest defence holds", "The coach stops a broken rest", "The attack continues if they hold", "The rest defence can be one player.", "The four break the moment the rest moves."),
        r("Counter Over", "11v11", "Secure or End", "Picture First", "channel", 18, 80, 54, "2:1", 2, 11, 11, 0, 2, "Most of a full pitch.", "Play the forward pass only if the picture is on, otherwise secure and the counter is over.", "Look before the forward pass", "Secure ends the counter on purpose", "The rest defence does not all go", "The forward pass is one touch.", "The opposition drops immediately."),
      ]),
    ],
    T2D: [
      eight("p-t2d-0", [
        r("Delay to Cones", "PoP", "5v3", "Recover to Cones", "press", 12, 24, 18, "3:1", 4, 5, 3, 0, 0, "24x18m with cones behind the ball.", "When the attack loses the ball, the nearest player delays and the other two recover onto the cones.", "The nearest player delays", "The other two find the cones", "Then the shape can jump", "The cones are deeper.", "The three attack the cones."),
        r("Five Then a Line", "PoP", "6v4", "Drop to Four", "press", 12, 30, 22, "3:1", 4, 6, 4, 0, 0, "30x22m.", "The team has five seconds to win the ball, then they drop into a line of four.", "Five seconds of press", "Then a line of four", "The line faces the ball", "Three seconds.", "The four score if they break the line."),
        r("Forward Pass First", "TP", "Fours", "Cut the Lane First", "square", 10, 16, 16, "3:1", 4, 4, 0, 0, 0, "16x16m square.", "The press cuts the forward pass first and the ball second.", "Kill the forward lane", "Then go to the ball", "Body shape does both", "The forward lane is wider.", "A fifth player is the outlet."),
        r("Goal Side of the Ball", "PoP", "8v6", "Five Seconds", "press", 14, 44, 34, "3:1", 4, 8, 6, 0, 1, "44x34m.", "Eight hunt a six and if five seconds pass they must be goal-side of the ball.", "Hunt for five seconds", "Then get goal-side", "The keeper calls the drop", "The six score if they are faced up.", "The six can play forward early."),
        r("Rebuild the Line", "PoP", "7v5", "Three Delay", "press", 14, 40, 32, "4:1", 3, 7, 5, 0, 1, "40x32m.", "The three nearest delay the counter while the back line rebuilds.", "Three delay", "The back line rebuilds", "Do not all chase", "The rebuild must be four players.", "The five attack the rebuilding line."),
        r("Only Backwards Wave", "PoP", "8v6", "Second Wave", "press", 14, 40, 32, "4:1", 3, 8, 6, 0, 1, "40x32m.", "A backwards pass is the only trigger for the second wave of the press.", "The first wave delays", "Backwards starts the second wave", "A forward pass means drop", "The second wave is the whole line.", "The six look for the forward pass."),
        r("Wide Means Drop", "PoP", "Final Third", "Press Then Drop", "press", 16, 44, 36, "4:1", 3, 8, 6, 0, 1, "44x36m in the final third.", "Counter-press in the final third, and drop if the ball goes wide.", "Press while the ball is central", "Wide ball, drop", "The drop is together", "The wide ball is still pressed for two seconds.", "The six switch play to escape."),
        r("Teammate Goalside", "11v11", "Rest Shape", "Jump When Set", "press", 18, 80, 54, "2:1", 2, 11, 11, 0, 2, "Most of a full pitch.", "Both teams keep a rest-defence shape and the counter is only jumped when a teammate is goalside.", "Stay in rest defence while attacking", "Jump only when a teammate is goalside", "Delay until then", "The teammate can be the keeper's call.", "The counter has six seconds."),
      ]),
      eight("p-t2d-1", [
        r("Arrive Side On", "TP", "Pairs", "Lose it on Purpose", "press", 10, 12, 10, "2:1", 6, 2, 0, 0, 0, "12x10m. Pairs give the ball away on purpose.", "Pairs lose the ball on purpose and the passer must arrive side-on, not dive in.", "Give it, then arrive side-on", "Do not dive in", "Show one way", "The receiver may turn.", "A third player is the outlet."),
        r("Ball and Lane", "TP", "Cover Player", "See Both", "square", 10, 14, 14, "3:1", 5, 4, 0, 0, 0, "14x14m. Four players and one ball.", "The covering player sees both the ball and the lane they are closing.", "Eyes on ball and lane", "The presser shows one way", "The lane stays shut", "The cover closes the lane with a curved body.", "Add an extra lane."),
        r("Two Banks", "PoP", "Failed Press", "Two Banks of Three", "press", 12, 30, 22, "3:1", 3, 6, 4, 0, 0, "30x22m.", "A failed press ends with the team in two banks of three.", "Know the press has failed", "Two banks of three", "The banks are connected", "One bank can be four.", "The four play through the banks."),
        r("Keeper Calls Drop", "PoP", "Line Drop", "Keeper's Voice", "lanes", 12, 36, 28, "3:1", 3, 6, 5, 0, 1, "36x28m.", "The goalkeeper starts the drop by calling the line back.", "The keeper owns the drop", "The line moves on the call", "Do not drop one at a time", "The call comes earlier.", "The five play in behind the line."),
        r("Second Ball Only", "PoP", "Win or Reset", "No Second Ball", "press", 14, 32, 24, "3:1", 4, 6, 5, 0, 0, "32x24m.", "Win the second ball and the attack may start, otherwise the practice resets.", "The first win is not enough", "The second ball starts the attack", "If it is lost, reset", "The second ball must be in the opponent's half.", "The five protect the second ball."),
        r("Tuck Before Jump", "PoP", "Far Player", "Then the Near Jump", "press", 14, 40, 30, "4:1", 3, 7, 6, 0, 1, "40x30m.", "The far player tucks in before the near player jumps.", "Tuck first", "Then the near player jumps", "The space behind is covered", "The far player tucks into midfield.", "The six switch to the far side."),
        r("Delay or No Goal", "PoP", "Three Nearest", "Counter Disallowed", "press", 16, 44, 34, "4:1", 3, 8, 6, 0, 1, "44x34m to one goal.", "A counter goal is disallowed if the three nearest did not delay.", "The three nearest must delay", "A missing delay cancels the goal", "Then the rest recover", "Two of the three are enough if the third is the keeper.", "The six attack quickly."),
        r("Six Second Delay", "11v11", "Delay Then Jump", "Backwards Only", "press", 18, 70, 50, "2:1", 2, 10, 10, 0, 2, "70x50m.", "The team delays for six seconds and may jump only on a backward pass.", "Delay for six seconds", "A backward pass is the jump", "A forward pass means keep delaying", "The count is four seconds.", "The ten attack the space in behind."),
      ]),
    ],
  },
};

function fiveMoments(existing: MomentOfGame, age: number): MomentOfGame[] {
  const missing = MOMENTS.filter((moment) => moment !== existing);
  return [...missing, MOMENTS[age % 4], MOMENTS[(age + 2) % 4]];
}

function band(age: number): AgeBand {
  if (age <= 8) return "U8-U10";
  if (age <= 11) return "U11-U13";
  return "U14-U16";
}

function licenseFor(skill: SkillLevel, age: number): LicenseLevel {
  if (skill === "Beginner") return age <= 8 ? "Grassroots" : "UEFA C";
  if (skill === "Intermediate") return age <= 9 ? "UEFA C" : "UEFA B";
  return age <= 10 ? "UEFA B" : "UEFA A";
}

function kit(row: Row) {
  const items = ["Balls", "Cones"];
  if (row.defenders > 0) items.push("Bibs (2 colors)");
  if (row.goalkeepers > 0) items.push(row.attackers + row.defenders >= 14 ? "Full size goals" : "Mini goals");
  return items;
}

function slug(skill: SkillLevel) {
  if (skill === "Beginner") return "b";
  if (skill === "Intermediate") return "i";
  return "p";
}

export function buildExtra(
  existing: { youthAge: number; skillLevel: SkillLevel; moment: MomentOfGame }[],
) {
  const skills: SkillLevel[] = ["Beginner", "Intermediate", "Professional"];
  const drills = [];
  for (const skill of skills) {
    for (const age of AGES) {
      const have = existing.find((item) => item.youthAge === age && item.skillLevel === skill);
      if (!have) throw new Error(`Missing the original drill for U${age} ${skill}`);
      const seen: Partial<Record<MomentOfGame, number>> = {};
      for (const moment of fiveMoments(have.moment, age)) {
        const variant = seen[moment] ?? 0;
        seen[moment] = variant + 1;
        const row = packs[skill][moment][variant]?.[AGES.indexOf(age)];
        if (!row) throw new Error(`No drill for U${age} ${skill} ${moment} variant ${variant}`);
        drills.push({
          id: `drill_x_${slug(skill)}_u${age}_${moment.toLowerCase()}_${variant}`,
          moment,
          type: row.type,
          focus: row.focus,
          playerSetup: row.playerSetup,
          constraint: row.constraint,
          license: licenseFor(skill, age),
          ageBand: band(age),
          diagram: row.diagram,
          minutes: row.minutes,
          length: row.length,
          width: row.width,
          workRest: row.workRest,
          repetitions: row.repetitions,
          players: {
            attackers: row.attackers,
            defenders: row.defenders,
            neutrals: row.neutrals,
            goalkeepers: row.goalkeepers,
          },
          equipment: kit(row),
          tags: [moment.toLowerCase(), row.type.toLowerCase(), skill.toLowerCase(), row.focus.toLowerCase()],
          pitchSetup: row.pitchSetup,
          instructions: row.instructions,
          coachingPoints: [...row.coachingPoints],
          progressions: [...row.progressions],
          youthAge: age,
          skillLevel: skill,
        });
      }
    }
  }
  return drills;
}
