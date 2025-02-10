import Logo from "./Logo";
import React from "react";
import { Footer, FooterCopyright, FooterDivider } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
export default function FooterCom() {
  return (
    <Footer
      container
      className="border-t-4 border-teal-500 dark:border-t-2 dark:border-white dark:bg-[#09090b]"
    >
      <div className="w-full max-w-8xl mx-auto ">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <Logo size={"text-xl"}></Logo>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="About us" />
              <Footer.LinkGroup col>
                <Footer.Link href="/" title="_blank" rel="noopener noreferrer">
                  Other Projects
                </Footer.Link>
                <Footer.Link href="/" title="_blank" rel="noopener noreferrer">
                  My Blogs
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link href="/" title="_blank" rel="noopener noreferrer">
                  GitHub
                </Footer.Link>
                <Footer.Link href="/" title="_blank" rel="noopener noreferrer">
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="/" title="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="/" title="_blank" rel="noopener noreferrer">
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="Vivek's Blog"
            year={new Date().getFullYear()}
          ></Footer.Copyright>

          <div className="flex  sm:justify-center gap-6 sm:mt-0 mt-4 ">
            <Footer.Icon href="#" icon={BsFacebook}></Footer.Icon>
            <Footer.Icon href="#" icon={BsInstagram}></Footer.Icon>
            <Footer.Icon href="#" icon={BsTwitter}></Footer.Icon>
            <Footer.Icon href="#" icon={BsGithub}></Footer.Icon>
          </div>
        </div>
      </div>
    </Footer>
  );
}
