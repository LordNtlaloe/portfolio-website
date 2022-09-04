const TypeWriter = function(txtElement, words, wait = 3000)
{
    this.txtElement = txtElement;
    this.words = words;
    this.text = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
}

TypeWriter.prototype.type = function(){

    const currentIndex = this.wordIndex % this.words.length;
    const fullText = this.words[currentIndex];

    if(this.isDeleting)
    {
        this.text =  fullText.substring(0, this.text.length - 1);
    }
    else
    {
        this.text =  fullText.substring(0, this.text.length + 1);
    }

    this.txtElement.innerHTML = `<span class=text>${this.text}</span>`;

    let typeSpeed = 300;
    if(this.isDeleting)
    {
        typeSpeed /= 3;
    }

    if(!this.isDeleting && this.text === fullText)
    {
        typeSpeed = this.wait;
        this.isDeleting = true;
    }
    else if(this.isDeleting && this.text === '')
    {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500; 
    }

    setTimeout(() => this.type(), typeSpeed);
}

document.addEventListener('DOMContentLoaded', init);

function init()
{
    const txtElement = document.querySelector('.text-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement, words, wait);
}