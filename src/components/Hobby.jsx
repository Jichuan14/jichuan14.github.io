function Hobby({ onNext, hasNext }) {
  return (
    <div className="hobby">
      <h2>Hobby</h2>
      <div className="hobby-item">
        <h3>Photography</h3>
        <p>
          I love capturing moments through the lens. Whether it's landscapes, street photography, 
          or portraits, I enjoy exploring different perspectives and telling stories through images.
        </p>
      </div>
      <div className="hobby-item">
        <h3>Reading</h3>
        <p>
          An avid reader of both fiction and non-fiction. I particularly enjoy science fiction, 
          technology books, and biographies. Reading helps me gain new perspectives and stay curious.
        </p>
      </div>
      <div className="hobby-item">
        <h3>Hiking</h3>
        <p>
          Exploring nature trails and mountains is one of my favorite ways to unwind. 
          Hiking provides a great balance between physical activity and mental relaxation, 
          and I always discover something new on each adventure.
        </p>
      </div>
      <div className="hobby-item">
        <h3>Cooking</h3>
        <p>
          Experimenting with different cuisines and recipes is a creative outlet for me. 
          I enjoy trying new ingredients and techniques, and sharing meals with friends and family.
        </p>
      </div>
    </div>
  )
}

export default Hobby

