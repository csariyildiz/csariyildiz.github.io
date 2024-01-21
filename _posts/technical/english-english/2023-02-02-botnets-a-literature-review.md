---
layout: post3
title: "Botnets: A Literature Review"
category: main
tags:
  - Botnets
---

This post is a document created as a minimal literature review. Hope you find it useful!

## Table Of Contents
1. Introduction
2. Basic Concepts
3. Tools And Techniques
4. Discussion
5. Conclusion & Future Directions
6. References

--------------------------------------

# Botnets: A Literature Review

The document was prepared by reading both published articles and sectoral reports as research resources. Reports prepared by industry experts on botnets, reports prepared by  international organizations, academic studies on the subject were examined and a general idea was tried to be formed. 

In order to narrow its scope, this study focuses on understanding current incidents by providing a general explanation of the operation of botnets, avoiding mitigation methods and historical analysis. While it is observed that the sectoral reports prepared by the companies better reflect the current situation, it has been observed that the reports prepared by the sector professionals might be more effective in deep analyzes of Botnets.


## Introduction

Botnets account for a large portion of recorded malicious activity on todays cyberthreat landscape. The damaging potential of their evolving nature with new strains and ability to evade detection makes Botnets difficult to defend against. For that reason, analysis of the botnets and their detection and mitigation methods of are frequently studied by both cybersecurity industry experts and academic field.

Botnet defined as network of systems infected by malware that are under the control of a single party. A botnet usually consist of hijacked nodes, the C&C ( Command & Control ) infrastructure that coordinates hijacked nodes, single party that operates the C&C, and harmful code or codes used to seize devices by taking advantage of vulnerabilities on targets. (Palo Alto Networks, 2021)

One of the most important features of botnets is to help to obfuscate their actual identities. Various hiding and manipulation techniques allow advesaries to evade traffic detection by hiding IP, domain and protocol information while implementing attacks such as spamming, phishing, DDoS attacks, and data theft, cryptojacking (mining).

Like other malicious activities, a bot herder's motivation can be financial gain, a social, political point or espionage. The attacker profile also appears to vary. Individuals with certain skills often have limited resources, while more organized groups appear more coordinated on their skill set and objectives, Government/Nation-State Actors emerge with even greater resources. (Emmanuel C. Ogu, 2019)

The consequences of an infected device can be excessive internet billing, slow and unstable computer performance, possible legal consequences, and stolen personal data. A general awareness of cyber security, strong password policy, keeping software up to date, and using antivirus software are beneficial to individual users. For a corporate infrastructure integrating a VPN, keeping the firmwares and operation systems updated, blocking unnecessary traffic, blocking ports, tracking recent vulnerabilities and scanning CVEs are important to mitigate Botnet based attacks. (Recorded Future, 2021)

As a mitigation and prevention methot “distruption” is often used as a countermeasure, especially by security agencies. At the same time, the control of botnets can be taken from the attackers. As an example Trickbot and Emotet have been disbanded by law enforcement in April 2021. Setting up a Honeypot to combat botnets is also a common practice used by law enforcement. In this process malware is captured through Honeypot, and then its behavior is studied with forensic applications. Studies involving methods such as machine learning for the detection of botnets are frequently encountered. Some antivirus software includes heuristics that recognize botnet behavior.

According to a report of International Data Corporation (IDC, 2020), researchers predict that by 2025 there will be 55.7 billion connected devices worldwide, 75% of which will be connected to an IoT platform. Another study claims that, bots make up nearly twothirds of internet traffic, and the malicious bots will create 40% of all traffic. (Barracuda Research, September 2021) (Recorded Future, 2021)

From a broad perspective, the latest developments in the field show that Botnets will remain  up-to-date in the future. The fact that it continues to be a challenge for academics in the fast  and continuously developing cyber security environment makes studies in the field valuable.

## Basic Concepts

Bot, which is derived from the word robot, emphasizes that a software is automated, while net, which is the abbreviation of the word network, emphasizes the communication of the computer on the network. The majority of Internet traffic today is handled by bots without this human interaction. Although the word botnet has a negative connotation today, in fact, automated processes are widely used in other areas with legal purposes like Wireless ad hoc networks (WANET, MANET) and web crawlers of search engines. (Simon Nam Thanh Vu, 2021)

Botnets are divided into two basic groups according to their architectural structures. The Centralized model can be summarized as a classic client server. Later, with the more widespread use of the P2P (peer-to-peer) model and digital signatures, this architecture used by Botnets in terms of their architecture.

<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/mirai-lifecycle-1.png" class="img-fluid" alt="Mirai Lifecycle">

The architectural structure of the botnet determines the communication with the C&C center, that is, the way the relevant commands are transferred. C&C can be a single server or often a group of servers. Although the effects of centralized botnets are stronger, the one C&C server creates a single point of failure. This type of vulnerability can lead to bots being taken over.

Botnet attack vectors vary. Botnets, which spread with the use of IRC when it first emerged, can use various techniques such as file-sharing networks, attachments to mails, using vulnerabilities defined on systems. (Simon Nam Thanh Vu, 2021)

The first appearance of botnets was through IRC channels in the 1980s. Botnet nodes were controlled using IRC as a messaging protocol. Later, as of 2003, botnets like MaXiTE continued to use IRC. Botnets such as Mirai and Zeus that emerged later became examples of botnets that became increasingly complex with their structures. A notable 2017 study included a detailed review of the Mirai botnet. Mirai sets an example as an effective botnet. Still active today, Mirai's population size varies, showing that it had around 600,000 botnet nodes in the first quarter of 2016. Mirai specifically targets devices such as cameras and DVRs by testing them from the predefined password list. Similarly, it attacks Router, Printer, VOIP Phone devices. While Mirai was only scanning port 23 at the beginning, it started to scan 2323, which is the IoT telnet port, over time. In the period when it reached 600,000 botnets, it continued to add 7447 ports and then other ports. (Antonakakis, 2017)

<img src="https://raw.githubusercontent.com/csariyildiz/csariyildiz.github.io/main/img/botnet-architectures-1.png" class="img-fluid" alt="Botner Architectures">

As indicated in the image, Mirai's life cycle begins with the scanning process performed by Bots. IPv4 IP addresses are scanned to search for ports that can be reached via telnet. Then, weak or default passwords are tried through an embedded dictionary. (Antonakakis, 2017)

When these devices are detected, the report server is informed. Then, by activating the report server loader, the relevant binary is downloaded to the infected machine. In the post-infection step, botmaster sends commands to C&C servers. C&C servers deliver these commands to Bots. Bots then send attack packets to DDOS targets. (Antonakakis, 2017)

## Tools And Techniques

Various methodologies are used to address the lifecycle of bots. For life cycle steps, Initial Access, Execution, Persistance, Defense Evation, Collection, Command And Control steps can be given as examples. These and similar steps are widely used in malware analysis. Once the malware infects the system, it executes malicious commands, consolidates its presence on the system, evades prevention and security mechanisms, collects data and listens to the command center. (Fortinet, 2019)

For the case of Emotet initial target was the financial sector. Emotet started as a trojan in 2014. It has developed over time and targeted the entire private and public sector in 2019. By using its own trojan “Emotet banking trojan” as a payload. At the same time, he was installing other banking trojans such as Azoruth, Zeus, Trickbot, IcedID, and Panda into the system it seized. It is correct to think of Emotet's frontend as a door opener. It then provides this service to different malware. When the user is infected, he becomes part of one of the networks called Epoch 1,2,3. (Fortinet, 2019)

```
Initial Access    : Spearphishing Mail With Attachment
Execution         : Powershell, User Execution, Service Execution
Persistance       : New Service
Defense Evation   : Scripting, Masquerading, Process Injection
Collection        : Email Collection
Command & Control : Remote File Copy, Commonly Used Ports, Standard Layer Protocols
```

Emotet’s initial access begins with a phishing mail. It is a spearphishing mail with a customized version for the target. As a social engineering method, a personalized mail constitutes the forwarding mechanism for the phishing email Emotet. An e-mail with an attachment with .zip or .docx extension is sent to the victim. When the user opens the attachment, "user execution" takes place and a powershell commands start to run. Powershell starts a session, runs the relevant commands and starts downloading the malware to the user's computer. It creates a new service and places the malicious payload in that service to obtain “persistence” on the system. When the service is shut down or the computer is restarted, the service is run again, thus ensuring persistence and survival on the system. (Fortinet, 2019)

It is observed that he uses different evasion techniques such as emotet scripting, masquerading, and process injection together. Communication of Emotet with C&C was done with encription. The email collection phase is of great importance to Emotet because once the system is comprimised, it starts searching for emails. It steals email data and delivers it to C&C infrastructure. In the next step, a phishing email specific to the email address the victim contacted is created by spoofing the email. When the new victim receives the e-mail, the probability of clicking on the attachment is very high, since the e-mail comes from a familiar computer on a familiar subject. Thus, fake mails that are very similar to real mails can be created. C&C system of Emotet is capable of remote file copying, it uses commonly used ports. This makes it difficult to detect.

In February 2021, the shutdown of Emotet was announced by Europol in a press report:

> “The infrastructure that was used by EMOTET involved several hundreds of servers located  across the world, all of these having different functionalities in order to manage the computers of the infected victims, to spread to new ones, to serve other criminal groups, and to ultimately make the network more resilient against takedown attempts.

> To severely disrupt the EMOTET infrastructure, law enforcement teamed up together to create an effective operational strategy. It resulted in this week’s action whereby law enforcement and judicial authorities gained control of the infrastructure and took it down  from the inside. The infected machines of victims have been redirected towards this law  enforcement-controlled infrastructure. This is a unique and new approach to effectively disrupt the activities of the facilitators of cybercrime”

When the C&C communication of Emotet is examined, it is seen that the encrypted data is sent with on body of post requests. Using the AES session key, the session key itself is encrypted with the RSA public key. Emotet binaries were also packed for evading detection. Customize packers are used to escape sandbox and automated detection. In the work done by the security units, the binaries were unpacked, and after the unpacking process, there were about 60 IP addresses in the configuration. Law enforcement analyzed all these examples and found the adversaries behind the malware. End of Emotet infrastructure distrupted by giving the botnet a self-deletion command after the relevant individuals were caught. It is noteworthy that it was stated in an earlier article that botnets could change hands in this way. (Brett Stone-Gross, 2009)

## Discussion

* According to a report of Checkpoint’s most of the malware (Checkpoint, 2021) most of malware has botnet related capabilities. Report lists current malware as Trickbot, XMRig, Formbook, Glupteba, Agent Tesla, Ramnit, Qbot, Phorpiex, xHelper and NJRat respectively of their impacts. Trickbot, Glupteba (matured to botnet) and Phorpiex directly referred as botnets. Considering Formbook and NJRat's C&C capabilities are also mentioned. Agenttesla and formbook are common keyloggers also used in these systems. Given the difficulty of finding details on the workings of these bots in academic articles, it is observed that the real events experienced and the technical analyzes of the systems that cause these events to take place differ. Due to the eclectic and changing nature of the systems, holistic analyzes of botnets might be prone to fail.
* Simon Nam Thanh Vu, 2021 A Survey on Botnets: Incentives, Evolution, Detection and Current Trends details systematic literature review detailing different subjects related to botnets. These selects 224 papers by using a methodology. Introduction, Related Work, Methodology, Incentives, Evolution of Botnets, Detection and Mitigation, Current Trends and Challenges are listed. The Introduction section starts with a vague explanation. Although current botnets such as Emotet and Trickbot not mentioned in the paper, botnets like Mirai, which is still active today, and Zeus, which are quite old mentioned. The article covers topics such as incentives are behind the development of botnet attacks, botnets evolution over time, research industries proposions to mitigate Botnet Attack, current trends and challenges related to botnets have been identified by contemporary research by giving citations to previous studies on the subject.
* Simon Nam Thanh Vu, 2021 paper uses research methodology which provided by guidelines on how to write a systematic literature review and how to use snowball sampling for paper  inclusion respectively by using Wohlin 2014 and Petticrew, M. 2008.
* The botnets first recorded appearance is dated as late 1980s on IRC forums. Goodin, D., 2016.
* Zou, C.C., 2006 and Zeng, J. 2012 papers mention about honetpots in 2004. Simon Nam  Thanh Vu, 2021 claims new botnets have shown a capacity to identify and avoid detection  from such measure in year 2004.
* Simon Nam Thanh Vu, 2021 relates Abu Rajab, M. 2006 to darknet. A term used to describe  networks that are difficult to track, such as Tor. 
* In 2007 Zeus Botnet starts to play a role and Etaher, N. 2015 and Zhang, W. 2014, Heron 2007, Liu, C. 2011 mentions about 2007 Zeus emergence. Sood, A.K. 2016 shows that HTTP-based botnets are explored and discussed along with a multitude of different other botnets in 2007.
* Wang, H., 2009 describes of various botnet characteristics, gives the latest research and insight into botnets.
* Chen, Z., 2009 warns against new type of botnet capabity of impersonating human reaction patterns.
* Anagnostopoulos, 2016, Hamon, V 2015, Mulliner, C. 2010 focuses on smartphones which become powerful enough over time to be a potential node for a malicious botnet.
* In 2011 botnets as a service became a new concept. Expored in Chang,W. 2014.
* In 2011, a new type of botnet structure based around a P2P-oriented basis is investigated, discussed and analysed for potential vectors of attack. (Li, H. 2012 ) (Aanjankumar, S. 2020),(Yan, G. 2011)
* Wang, T. 2013 Other botnets use obfuscation tactics to hide the true identity/position of the C&C’s location, showcasing a trend of botnets growing more versatile and elusive to researchers.
* Boshmaf, Y. 2013 emphizies of more kinds of botnet susceptible hosts become more common, leading to new potential vectors of attack. Perrotta, R.; Hao 2018 also mentions this later.
* In 2016 Vehicles can also be a potential vector for botnets, such as GHOST. Garip, M.T. 2016 focuses on VANETs in cars and attack focused on VANET communication.
* In 2016 IoT devices have become equipped with enough processing power to pose a sizeable threat. Due to insufficient security practices, these devices created notable vulnerabilities. 
* Yamaguchi 2020, Bertino 2017, Mendes 2019 emphazises IoT vulnerabilities and their explotation by Botnets. Kudo, T. 2016 proposes for self-evolving botnets
* Bock, L. 2019 concludes that cryptocurrencies have lead to explorations into new areas of potential botnets and also potential new architectures.
* Eslahi, M., 2012 provides general information on the subject and discusses prevention methods. It contains 37 separate references between 2007 and 2012.
* Garg, S., 2017 and Lange, T. 2019 mention various types of botnet attacks. It seems that the article does not refer to prevention systems. The evolution of botnets over time is listed in detail. Research dating back to 2016 and 2018
* Silva, S.S., 2013 , García, S. 2014, Karim, A. 2014 provides detailed insight on research on botnets. However, since these articles are before 2014, it is seen that they do not include studies made after 2014. Although Silva, S.S.; is especialy good in terms of literature review, it has been seen that it covers the changes in the literature well until 2013.
* 2018 papers Khehra, G. 2018 also has a detailed analysis of botnets and Abdullah, Z. 2018 focuses on Android botnets.
* Eslahi, M. 2012 includes potential developments on botnets on mobile device networks, since it is pre-2012, it does not include current studies.
* The Hoque, N. 2015 extends over a wide range of dates from 1993 to 2015, and especially extends to DDOS attacks.

## Conclusion & Future Directions

It is predicted that botnets will continue to interest the public view and academic circles in the future. While attacks over the years confirm this prediction, increasing processor capacities, population of IoT devices, emerging technologies such as Blockchain and advanced artificial intelligence applications are factors that expand the domain of botnets. At the same time, it can be predicted that with the increase of awareness on cyber security, detailed analysis and  mitigation/prevention methods of botnets will also gain sophistication in future.

In the current landscape, it would be unrealistic to think that the existing literature on botnets fully reflects the nature of the phenomenon. While the Botnets are not static entities. They adapt and evolve to avoid detection and improve their capabilities. New techniques and strategies are continually developed by cybercriminals, making it challenging for the existing literature to keep up. Understanding the behavior of botnets, including their tactics, techniques, and procedures (TTPs), is critical for effective defense. Much of the botnet landscape operates in underground forums and communities. Researchers often have limited access to these spaces, making it difficult to gain a comprehensive understanding of the actors, motivations, and strategies behind botnet operations. The future direction of botnet research and cybersecurity efforts will likely involve several key trends and areas of focus including implications of emerging machine learning and AI capabilities, improvement of the underlying legal frameworks for legal systems, implications of emerging quantum computing capabilities. Area has need more detailed analysis of nature and innerworkings of emerging botnets with in-depth research and analysis of current botnets as well as new and evolving botnet variants.

## Resources

* García, S.; Zunino, A.; Campo, M. Survey on network-based botnet detection methods. Secur. Commun. Netw. 2014, 7, 878–903.
* Thanh Vu SN, Stege M, El-Habr PI, Bang J, Dragoni N. A Survey on Botnets: Incentives, Evolution, Detection and Current Trends. Future Internet. 2021; 13(8):198.
* Silva, S.S.; Silva, R.M.; Pinto, R.C.; Salles, R.M. Botnets: A survey. Comput. Netw. 2013, 57, 378–403. Botnet Activity: Analysis, Detection and Shutdown.
* Hoque, N.; Bhattacharyya, D.K.; Kalita, J.K. Botnet in DDoS Attacks: Trends and  Challenges. IEEE Commun. Surv. Tutor. 2015, 17, 2242–2270.
* Brett Stone-Gross, Marco Cova, Lorenzo Cavallaro, Bob Gilbert, Martin Szydlowski,  Richard Kemmerer, Christopher Kruegel, and Giovanni Vigna. 2009. Your botnet is  my botnet: analysis of a botnet takeover. In Proceedings of the 16th ACM conference  on Computer and communications security (CCS '09). Association for Computing  Machinery, New York, NY, 
* Emmanuel C. Ogu, Ojesanmi OA, Awodele O, Kuyoro ‘S. A Botnets Circumspection:  The Current Threat Landscape, and What We Know So Far. Information. 2019; 10(11):337.
* Eslahi, M.; Salleh, R.; Anuar, N.B. Bots and botnets: An overview of characteristics, detection and challenges. In Proceedings of the 2012 IEEE International Conference  on Control System, Computing and Engineering, Penang, Malaysia, 23–25 November 2012; pp. 349–354.
* Etaher, N., Weir, G.R., & Alazab, M. (2015). From ZeuS to Zitmo: Trends in Banking Malware. TrustCom 2015.
* Zhang, W., Wang, Y. J., & Wang, X. L. (2014, August). A Survey of Defense against P2P Botnets. In 2014 IEEE 12th International Conference on Dependable, Autonomic  and Secure Computing (pp. 97-102). IEEE.
* Karim, A.; Salleh, R.; Shiraz, M.; Shah, S.; AWAN, I.; Anuar, N. Botnet detection techniques: Review, future trends and issues. J. Zhejian Univ. Comput. Electron.  2014, 15, 943–983.
* Mendes, L. D., Aloi, J., & Pimenta, T. C. (2019, December). Analysis of IoT Botnet Architectures and Recent Defense Proposals. In 2019 31st International Conference on Microelectronics (ICM) (pp. 186-189). IEEE.
* Garip, M. T., Reiher, P., & Gerla, M. (2016, September). Ghost: Concealing vehicular botnet communication in the vanet control channel. In 2016 International Wireless Communications and Mobile Computing Conference (IWCMC) (pp. 1-6). IEEE.
* D. Godin, 2016 Avaible Online: https://arstechnica.com/informationtechnology/2016/11/new-iot-botnet-that-borrows-from-notorious-mirai-infects-3500- devices
* Bertino, E., & Islam, N. (2017). Botnets and internet of things security. Computer, 50(2), 76-79.
* Yamaguchi, S. (2020, January). Botnet Defense System: Concept and Basic Strategy. In 2020 IEEE International Conference on Consumer Electronics (ICCE) (pp. 1-5). IEEE.
* Yan, G., Ha, D. T., & Eidenbenz, S. (2011). AntBot: Anti-pollution peer-to-peer botnets. Computer networks, 55(8), 1941-1956.
* Heron, S. (2007). Working the botnet: how dynamic DNS is revitalising the zombie army. Network Security, 2007(1), 9-11.
* Manos Antonakakis, Tim April, Michael Bailey, Matthew Bernhard, Elie Bursztein, Jaime Cochran, Zakir Durumeric, J. Alex Halderman, Luca Invernizzi, Michalis Kallitsis, Deepak Kumar, Chaz Lever, Zane Ma, Joshua Mason, Damian Menscher, Chad Seaman, Nick Sullivan, Kurt Thomas, and Yi Zhou. 2017. Understanding the mirai botnet. In Proceedings of the 26th USENIX Conference on Security Symposium (SEC'17). USENIX Association, USA, 1093–1110
* Garg, S.; Sharma, R.M. Anatomy of botnet on application layer: Mechanism and mitigation. In Proceedings of the 2017 2nd International Conference for Convergence in Technology, I2CT 2017 Mumbai, India, 7–9 April 2017; pp. 1024–1029
* December 2012; p. 6482109.
* Palo Alto Networks, 2021 Avaible online: https://www.paloaltonetworks.com/cyberpedia/what-is-botnet
* Wohlin, C. Guidelines for Snowballing in Systematic Literature Studies and a Replication in Software Engineering; EASE ’14.; Association for Computing Machinery: New York, NY, USA, 2014. 
* Checkpoint, 2021 Avaible online: https://blog.checkpoint.com/2021/07/13/june2021s-most-wanted-malware-trickbot-remains-on-top/
* Petticrew, M.; Roberts, H. Systematic Reviews in the Social Sciences: A Practical Guide; John Wiley & Sons: Hoboken, NJ, USA, 2008
* Fortinet, 2019 Avaible online: https://www.fortinet.com/blog/threat-research/emotetplaybook-banking-trojan
* IDC, 2020 IoT Growth Demands Rethink of Long-Term Storage Strategies, says IDCAvaible online: https://www.idc.com/getdoc.jsp?containerId=prAP46737220
* Lange, T.; Kettani, H. On Security Threats of Botnets to Cyber Systems. In Proceedings of the 2019 6th International Conference on Signal Processing and Integrated Networks (SPIN), Noida, India, 7–8 March 2019; pp. 176–183
* Khehra, G.; Sofat, S. Botnet Detection Techniques: A Review. In Proceedings of the 2018 Second International Conference on Intelligent Computing and Control Systems (ICICCS), Madurai, India, 14–15 June 2018; pp. 1319–1326.
* Abdullah, Z.; Saudi, M. RAPID-Risk Assessment of Android Permission and Application Programming Interface (API) Call for Android Botnet. Int. J. Emerg. Technol. Learn. 2018, 7, 49–54
* Recorded Future, 2021 Available online: https://go.recordedfuture.com/hubfs/reports/cta-2021-1112.pdf 
* Khan RU, Zhang X, Kumar R, Sharif A, Golilarz NA, Alazab M. An Adaptive MultiLayer Botnet Detection Technique Using Machine Learning Classifiers. Applied Sciences. 2019; 9(11):2375.
* Zhang, Z., Lu, B., Liao, P., Liu, C., & Cui, X. (2011, June). A hierarchical hybrid structure for botnet control and command. In 2011 IEEE International Conference on Computer Science and Automation Engineering (Vol. 1, pp. 483-489). IEEE.
* Sood, A. K., Zeadally, S., & Bansal, R. (2017). Cybercrime at a scale: A practical study of deployments of HTTP-based botnet command and control panels. IEEE Communications Magazine, 55(7), 22-28.
* Wang, H., & Gong, Z. (2009, October). Collaboration-based botnet detection architecture. In 2009 Second International Conference on Intelligent Computation Technology and Automation (Vol. 2, pp. 375-378). IEEE.
* Chen, Z., Chen, C., & Wang, Q. (2009, August). Delay-tolerant botnets. In 2009 Proceedings of 18th International Conference on Computer Communications and Networks (pp. 1-6). IEEE.
* Anagnostopoulos, M., Kambourakis, G., & Gritzalis, S. (2016). New facets of mobile botnet: architecture and evaluation. International Journal of Information Security, 15(5), 455-473.
* Mulliner, C., & Seifert, J. P. (2010, October). Rise of the iBots: Owning a telco network. In 2010 5th International Conference on Malicious and Unwanted Software (pp. 71-80). IEEE.
* Chang, W., Wang, A., Mohaisen, A., & Chen, S. (2014, August). Characterizing botnets-as-a-service. In Proceedings of the 2014 ACM conference on SIGCOMM (pp. 585-586).
* Li, H., Hu, G., & Yang, Y. (2012, September). Research on P2P Botnet network behaviors and modeling. In International Conference on Information Computing and Applications (pp. 82-89). Springer, Berlin, Heidelberg.
* Aanjankumar, S., & Poonkuntran, S. (2020). An efficient soft computing approach for securing information over GAMEOVER Zeus Botnets with modified CPA algorithm.  Soft Computing, 24(21), 16499-16507.
* Wang, T., Wang, H., Liu, B., & Shi, P. (2013, July). What is the Pattern of a Botnet?. In 2013 12th IEEE International Conference on Trust, Security and Privacy in  Computing and Communications (pp. 257-264). IEEE.
* Boshmaf, Y., Muslukhov, I., Beznosov, K., & Ripeanu, M. (2013). Design and analysis of a social botnet. Computer Networks, 57(2), 556-578
