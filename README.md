# Image-Steganography

![alt text](http://cygnus.tele.pw.edu.pl/~wmazurczyk/cuing/images/Logo10.jpg)

Steganography is the art of hiding information in plain sight, and in this tutorial, I'll show you how to use Steghide — a very simple command line tool to do just that. In addition, I'll go over a bit of conceptual background to help you understand what's going on behind the scenes. This is a tool that's simple, configurable, and only takes a few seconds to hide information in many file types.

What Is Steganography?
Unlike encryption, where it's obvious that a message is being hidden, steganography hides data in plain view, inside a file such as a picture. As far as images are concerned, to anyone who isn't aware that it contains hidden data, it looks like just a normal, innocent picture.

Steganography is useful in situations where sending encrypted messages might raise suspicion, such as in countries where free speech is suppressed. It's also frequently used as a digital watermark to find when images or audio files are stolen. And on a less practical note — it's just cool.

More Info: A Beginner's Guide to Steganography

How Is Steganography Implemented?
There are several different techniques for concealing data inside of normal files. One of the most widely used and perhaps simplest to understand is the least significant bit technique, known commonly as LSB.

This technique changes the last few bits in a byte to encode a message, which is especially useful in something like an image, where the red, green, and blue values of each pixel are represented by eight bits (one byte) ranging from 0 to 255 in decimal or 00000000 to 11111111 in binary.

Changing the last two bits in a completely red pixel from 11111111 to 11111101 only changes the red value from 255 to 253, which to the naked eye creates a nearly imperceptible change in color but still allows us to encode data inside of the picture.

![alt text](https://img.wonderhowto.com/img/02/61/63645877844452/0/steganography-hide-secret-data-inside-image-audio-file-seconds.w1456.jpg)

This diagram shows two 4-pixel images in both color and binary values. Each block of binary represents the value of the corresponding pixel.
The least significant bit technique works well for media files, where slightly changing byte values creates only slight imperceptible changes, but not so well for things like ASCII text, where a single bit out of place will completely change the character. That's not to mention the fact that data hidden using LSB steganography is also easy to detect if someone is looking for it.

For this reason, there are a plethora of other steganography techniques out there, each with their own benefits and drawbacks. Another far less detectable one is called the discrete cosine transform coefficient technique (I know, it's a mouthful), which slightly changes the weights (coefficients) of the cosine waves that are used to reconstruct a JPEG image.

Using Steganography Effectively
Keeping in mind that certain digital steganography techniques are better than others, generally, it's best to avoid the LSB technique and go for something a bit more sophisticated. In fact, designing your own steganography algorithm isn't terribly difficult if you already have good coding and math foundations. But to get a feel for how steganography works, LSB, which Steghide uses, will do just fine here.

Two other things to consider are encryption and compression. Encrypting data before embedding it adds an extra layer of security while compressing your data will obviously allow you to fit more into your cover file. Both encryption and compressions schemes can be included as optional parameters in Steghide.

So enter your passphrase and password it to make secure. Once you get used to this process, it'll only take seconds to hide your data inside an image or audio file with Steghide.


![alt text](https://img.wonderhowto.com/img/39/27/63645855710304/0/steganography-hide-secret-data-inside-image-audio-file-seconds.w1456.jpg)
Image by Hisashi/Flickr


Here is a side-by-side comparison of the original image and the steganographic image. Can you detect any difference?

I hope you enjoyed this tutorial and realized just how easy it is to use steganography. It literally only takes a moment to hide secret messages inside media files, and whether you're doing it for copyright protection or just to be cool, steganography has a multitude of applications.

Thanks for reading, and if you have any questions, feel free to ask me.

## License
Zircon is made available under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
