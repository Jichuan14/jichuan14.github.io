function Hobby({ onNext, hasNext }) {
  return (
    <div className="hobby">
      <h2>Hobby</h2>
      <div className="hobby-item">
        <h3>Road Cycling</h3>
        <p>
          I'm passionate about road cycling and love exploring new routes. 
          I've clocked almost <b>10,000 km</b> this year! Cycling is not just a hobby for me, I'm pushing myself to be better for every ride, chasing my power goal!
        </p>
      </div>
      <div className="hobby-item">
        <h3>Honor of Kings</h3>
        <p>
          I enjoy playing Honor of Kings (王者荣耀), a strategic mobile MOBA game. It's a great way to unwind 
          and challenge myself with. Lady Sun is my goto hero everytime!
        </p>
      </div>
    </div>
  )
}

export default Hobby

