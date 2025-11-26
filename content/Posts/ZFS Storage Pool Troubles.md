---
draft: true
note: A draft page will not be shown in the production site
---
If you've been on the server a while you may remember that one time an SSD overheated and died on us, leading to me restoring worlds from a backup.

> [Previous Announcement #1](https://discord.com/channels/565238010522894341/620291245712867330/1264614917315629197)
> [Previous Announcement #2](https://discord.com/channels/565238010522894341/620291245712867330/1265768357207212112)
> ![[Pasted image 20251125191503.png]] ![[Pasted image 20251125191625.png]]

So, problem solved right? Apparently WRONG! (*[comical buzzer sound](https://youtu.be/3GDr-eyhsSM?si=66MDddYkbmkhrHWa)*). Recently we had a server crash, which was seemingly random. Upon further inspection of the logs, it certainly was not random.

If you want to see the error, here it is: https://pastebin.com/dbavarq3. After sifting through this for a while, I eventually found that I can't read walls of texts and asked AI (yes ik ik - AI bad) what the cause was. The AI wasn't very helpful but it did point me to  `UnixFileDispatcherImpl.write0`, which peaked my interest.

So I ran the `iostat` command, which showed me that the two SSDs that make up the ZFS pool were running at speeds $\sim 300 \,\,\pu{kB.s^{-1}}$ read and $\sim 560 \,\,\pu{kB.s^{-1}}$ write. Which, uh, isn't great.

Further reading suggested that ZFS pools aren't ideal for minecraft servers (oops), but given we've had this single point failure before I don't really want it to happen again, and I don't have it setup in an ideal way (oops again).

I think, as part of future upgrade plans, I may look at swapping from SATA SSDs to NVMe SSDs.

Could this also tie into the mysterious network issues we're having? Maybe. Could this be the cause of all the world corruption from Modded 2.0? Almost certainly.
